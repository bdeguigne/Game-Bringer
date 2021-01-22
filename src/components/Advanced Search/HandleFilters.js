

import React, { useState, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import styled from "styled-components";
import Collapsable from './Collapsable';
import { filters, addAndGroupElem, isFiltersExist, replaceTerm, findValueFromQuery, removeTerm } from './filters';
import CheckboxFilter from './CheckboxFilter';
import { connect } from 'react-redux';
import { appColors } from "../../utils/styles";
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';

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


function HandleFilters(props) {
    const [expand, setExpand] = useState([]);
    const [activatedFilters, setActivatedFilters] = useState(null)

    const addActivatedFilters = (filter) => {
        let replace = false;

        if (filter.replace) {
            replace = filter.replace
        }
        
        const res = addAndGroupElem(activatedFilters, filter.type, filter.data, replace);

        setActivatedFilters(res);
        onChange()
    }

    const removeActivatedFilters = (toRemoved, titleSlug) => {
        setActivatedFilters(removeTerm(toRemoved, titleSlug, activatedFilters))
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
        if (props.queryFilters && Object.keys(props.queryFilters).length !== 0  && !activatedFilters) {
            setActivatedFilters(props.queryFilters);
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
                        type: data.slug,
                        data: data.data.slug
                    })
                } else if (data.data.remove && data.data.remove === true) {
                    removeActivatedFilters(data.data, data.slug)
                }
                break;
            case "slider":
                addActivatedFilters({
                    type: data.slug,
                    replace: true,
                    data: `${data.data.minimum},${data.data.maximum}`
                })
                break;
            case "textField":
                addActivatedFilters({
                    type: data.slug,
                    replace: true,
                    data: `${data.data}`
                })
                break;
            default:
                break;
        }
    }

    function isFilterActive(title, label) {
        // console.log("is filter ACTIVE", activatedFilters, title, label);
        return isFiltersExist(activatedFilters, title, label)
    }

    const renderFilters = (child, filter, index) => {
        switch (child.type) {
            case "checkbox":
                return <CheckboxFilter key={index} onChange={onChangeFilter} label={child.label} title={filter.title} slug={child.slug} active={isFilterActive(filter.title.toLowerCase(), child.slug)} />
            case "component":
                return <child.component key={index} onChange={onChangeFilter} title={filter.title} value={findValueFromQuery(activatedFilters, filter.slug || filter.title.toLowerCase()).split(",")} {...child.props} />
            case "divider":
                return <Divider key={index} />
            default:
                return null;
        }
    }

    const onSeeAllClick = (index) => {
        console.log("On See all ", index);

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

    return (
        <FiltersContainer>
            {filters(props.genres, props.modes, props.perspectives).map((filter, filterIndex) => {
                return (
                    <Collapsable
                        key={filterIndex}
                        index={filterIndex}
                        title={filter.title}
                        showAll={!filter.maxChildren}
                        onSeeAllClick={onSeeAllClick}
                        collapse={filter.collapse !== undefined ? filter.collapse : true}
                    >
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
                    </Collapsable>
                )
            })}
        </FiltersContainer>
    )
}

HandleFilters.propTypes = {
    queryFilters: PropTypes.object,
    onChange: PropTypes.func,
    term: PropTypes.string
}

function mapStateToProps(state) {
    return {
        genres: state.filtersReducer.genres,
        modes: state.filtersReducer.modes,
        perspectives: state.filtersReducer.perspectives,
    };
}

export default compose(
    withRouter,
    connect(mapStateToProps)
)(HandleFilters);
