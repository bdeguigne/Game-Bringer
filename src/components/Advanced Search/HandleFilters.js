

import React, { useState, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import styled from "styled-components";
// import Collapsable from './Collapsable';
import { filters, addAndGroupElem, isFiltersExist, replaceTerm, findValueFromQuery, removeTerm } from './Filters';
import CheckboxFilter from './CheckboxFilter';
import { connect } from 'react-redux';
import { appColors } from "../../utils/styles";
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { TreeItem, TreeView } from '@material-ui/lab';
import { ExpandMore, ChevronLeft } from '@material-ui/icons';
import { correctIds } from '../../redux/actions/filtersActions'

const FiltersContainer = styled.div`
    width: 238px;
    margin-left: 16px;
`

const Divider = styled.hr`
    margin: 8px auto;
    width: 80%;
    border: 1px solid ${appColors[700]};
    opacity: 0.6;
    border-radius: 5px;
`

const LargeTreeView = styled(TreeView)`
    width: 238px;
`

const SeeAllButton = styled.div`
    cursor: pointer;
    text-transform: uppercase;
    color: ${appColors.primarySimple};
`

const TreeWrapper = styled.div`
     margin-bottom: 16px;
`

const SeeAllContainer = styled.div`
    margin-top: 4px;
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    user-select: none;
    font-size: 12px;
`

const DoubleArrowIcon = styled.span`
    font-size: 14px !important;
    margin-left: 4px;
    transform: rotate(-90deg);
    color: ${appColors.primarySimple};
`

function HandleFilters(props) {
    const [expand, setExpand] = useState([]);
    const [activatedFilters, setActivatedFilters] = useState(null);
    const [loadedFilters, setLoadedFilters] = useState([]);
    const [collapseIds, setCollapseIds] = useState([]);
    const [expandIds, setExpandIds] = useState([]);
    const [correctChipIds, setCorrectChipIds] = useState(false);
    const [isFiltersLoaded, setIsFiltersLoaded] = useState(false);

    const addActivatedFilters = (data) => {
        let replace = false;

        const filter = data.front;

        if (filter.replace) {
            replace = filter.replace
        }

        const res = addAndGroupElem(activatedFilters, filter.type, filter.data, filter.label, replace);

        setActivatedFilters(res);
        onChange()
    }

    const removeActivatedFilters = (toRemoved, titleSlug) => {
        setActivatedFilters(removeTerm(toRemoved.slug, toRemoved.label, titleSlug, activatedFilters))
        onChange();
    }

    const onChange = useCallback(
        () => {
            if (props.onChange && activatedFilters) {
                props.onChange(activatedFilters);
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [activatedFilters],
    )

    useEffect(() => {
        if (props.queryFilters && Object.keys(props.queryFilters).length !== 0 && !activatedFilters) {
            setActivatedFilters(
                { front: props.queryFilters, chip: JSON.parse(JSON.stringify(props.queryFilters)) },
            );
        } 

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.queryFilters])

    useEffect(() => {
        if (props.term !== "") {
            setActivatedFilters(replaceTerm(activatedFilters, props.term))
            onChange();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.term])

    useEffect(() => {
        onChange()
    }, [onChange])

    const onChangeFilter = (data) => {
        switch (data.type) {
            case "checkbox":
                if (data.data.checked === true) {
                    addActivatedFilters({
                        front: {
                            type: data.slug,
                            data: data.data.slug,
                            label: data.data.label
                        }
                    })
                } else if (data.data.remove && data.data.remove === true) {
                    removeActivatedFilters(data.data, data.slug)
                }
                break;
            case "slider":
                addActivatedFilters({
                    front: {
                        type: data.slug,
                        replace: true,
                        data: `${data.data.minimum},${data.data.maximum}`
                    }
                })
                break;
            case "textField":
                addActivatedFilters({
                    front: {
                        type: data.slug,
                        replace: true,
                        data: `${data.data}`,
                        label: data.label
                    }
                })
                break;
            default:
                break;
        }
    }

    function isFilterActive(title, label) {
        return isFiltersExist(activatedFilters?.front, title, label)
    }

    const renderFilters = (child, filter, index) => {
        switch (child.type) {
            case "checkbox":
                return <CheckboxFilter key={index} onChange={onChangeFilter} label={child.label} title={filter.title} titleSlug={filter.slug || filter.title.toLowerCase()} slug={child.slug} id={child.id} active={isFilterActive(filter.slug || filter.title.toLowerCase(), child.id?.toString())} activatedFilters={props.activatedFilters} refresh={props.refreshFilters}/>
            case "component":
                return <child.component key={index} onChange={onChangeFilter} title={filter.title} value={findValueFromQuery(activatedFilters?.front, filter.slug || filter.title.toLowerCase()).split(",")} valueLabel={props.isCorrectSet ? findValueFromQuery(activatedFilters?.chip, filter.slug || filter.title.toLowerCase()).split(",") : []} activatedFilters={props.activatedFilters} refresh={props.refreshFilters} {...child.props} />
            case "divider":
                return <Divider key={index} />
            default:
                return null;
        }
    }

    const onSeeAllClick = (index) => {
        setExpand([...expand, {
            index,
            state: true
        }])
    }

    const renderedChildrenCount = (filterIndex, filter) => {
        let count = filter.maxChildren;

        expand.forEach(elem => {
            if (elem.index === filterIndex && elem.state) {
                count = filter.children.length;
            }
        })
        return count;
    }

    const correctChipIdsOnStart = (filtersData) => {
        if (filtersData.length > 0 && activatedFilters && !correctChipIds) {
            const needRequestIds = [];

            Object.keys(activatedFilters.chip).forEach(key => {
                const replaceFiltersArray = [];

                filtersData.forEach(filter => {
                    if ((filter.slug || filter.title.toLowerCase()) === key) {
                        switch (key) {
                            case "ratings":
                                break;
                            default:
                                let chipValue = activatedFilters.chip[key].split(",");

                                chipValue.forEach(chipId => {
                                    filter.children.forEach(child => {
                                        if (child.id === parseInt(chipId)) {
                                            replaceFiltersArray.push(child.label)
                                            chipValue = chipValue.filter(item => item !== chipId)
                                        }
                                    })
                                })
                                if (chipValue.length > 0) {
                                    needRequestIds.push({ ids: chipValue, slug: key })
                                }

                                activatedFilters.chip[key] = replaceFiltersArray.concat(chipValue).join(",")

                        }
                        setActivatedFilters(activatedFilters);
                        onChange()
                        setCorrectChipIds(true);
                    }
                })
            })
            props.correctIds(needRequestIds);
        }
    }

    useEffect(() => {
        if (isFiltersLoaded) {
            const filtersData = filters(props.genres, props.modes, props.perspectives);
            const ids = [];


            filtersData.forEach((filter, index) => {
                let isCollapse = true;

                if (filter.collapse === false) {
                    isCollapse = false
                }
                if (activatedFilters && activatedFilters.front && activatedFilters.front[filter.slug || filter.title.toLowerCase()] && activatedFilters.front[filter.slug || filter.title.toLowerCase()] !== "") {
                    isCollapse = true;
                }
                if (isCollapse === true) {
                    ids.push(`${index}`);
                }
            })

            setCollapseIds(ids);
            setExpandIds(ids);
            setLoadedFilters(filtersData);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isFiltersLoaded, activatedFilters])

    useEffect(() => {
        if (isFiltersLoaded) {
            if (activatedFilters) {
                correctChipIdsOnStart(loadedFilters);
            } else {
                setCorrectChipIds(true)
            }
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isFiltersLoaded, loadedFilters, activatedFilters])

    useEffect(() => {
        if (props.genres.length > 0 && props.modes.length > 0 && props.perspectives.length > 0) {
            setIsFiltersLoaded(true)
        }
    }, [props.genres, props.modes, props.perspectives])

    // useEffect(() => {
    //     // setActivatedFilters(props.activatedFilters)
    // }, [props.refresh, props.activatedFilters])

    return (
        <FiltersContainer>
            {collapseIds.length > 0 && (
                <LargeTreeView
                    defaultCollapseIcon={<ExpandMore />}
                    defaultExpandIcon={<ChevronLeft />}
                    defaultExpanded={collapseIds}
                    onNodeToggle={(evt, value) => setExpandIds(value)}
                >
                    {loadedFilters.map((filter, filterIndex) => {
                        return (
                            <TreeWrapper key={filterIndex}>
                                <TreeItem nodeId={`${filterIndex}`} label={filter.title}>
                                    {filter.children && filter.children.map((child, childIndex) => {
                                        if (filter.maxChildren) {
                                            if (childIndex < renderedChildrenCount(filterIndex, filter)) {
                                                return renderFilters(child, filter, childIndex)
                                            } else {
                                                return null;
                                            }
                                        } else {
                                            return renderFilters(child, filter, childIndex)
                                        }

                                    })}
                                </TreeItem>
                                {filter.maxChildren && expandIds.includes(filterIndex.toString()) && !expand.find(elem => elem.index === filterIndex) && (
                                    <SeeAllContainer>
                                        <SeeAllButton onClick={() => onSeeAllClick(filterIndex)}>See all</SeeAllButton>
                                        <DoubleArrowIcon className="icon-double-arrow" />
                                    </SeeAllContainer>
                                )}

                            </TreeWrapper>
                        )
                    })}
                </LargeTreeView>
            )}
        </FiltersContainer >
    )
}

HandleFilters.propTypes = {
    queryFilters: PropTypes.object,
    onChange: PropTypes.func,
    term: PropTypes.string,
    refresh: PropTypes.number
}

const actionCreators = {
    correctIds
}

function mapStateToProps(state) {
    return {
        genres: state.filtersReducer.genres,
        modes: state.filtersReducer.modes,
        perspectives: state.filtersReducer.perspectives,
        isCorrectSet: state.uiReducer.isCorrectIds,
        activatedFilters: state.uiReducer.activatedFilters,
        refreshFilters: state.uiReducer.refreshFilters
    };
}

export default compose(
    withRouter,
    connect(mapStateToProps, actionCreators)
)(HandleFilters);
