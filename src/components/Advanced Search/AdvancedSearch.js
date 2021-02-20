import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import styled from "styled-components";
import { appColors, Center } from "../../utils/styles";
import { InputBase, CircularProgress, Snackbar } from "@material-ui/core";
import { Alert } from '@material-ui/lab';
import { setRouteIndex, setIsCorrectIds, setActivatedFiltersAction, setIsErrorOccurred } from "../../redux/actions/UIActions";
import { search, moreSearchResult, setFilters } from '../../redux/actions/filtersActions';
import TermChip from "./ChipFilters";
import { RouteIndex } from "../../redux/constants/uiConstants";
import SearchResultCard from "./SearchResultCard";
import { Padding } from '../../utils/styles';
import HandleFilters from './HandleFilters';
import { useLocation, withRouter } from "react-router-dom";
import { generateParams, getFiltersWithQuery, replace, addAndGroupElem } from './Filters'
import { compose } from 'redux';
import SelectSort from './SelectSort';

const SearchContainer = styled.div`
  width: 100%;
  height: 160px;
  display: flex;
  align-items: center;
`

const SearchBar = styled.div`
    transition: box-shadow 0.2s;
  border: ${props => `1px solid ${appColors[props.theme].secondaryDarker}`};
  border-radius: 16px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color : ${props => appColors[props.theme].backgroundContrast};
  box-shadow: ${props => props.isActive ? `0px 0px 12px 3px #6d5dd352, inset 0px 0px 8px ${appColors[props.theme].secondaryDarker}` : `0px 0px 12px 3px rgba(0, 0, 0, 0.25), inset 0px 0px 8px ${appColors[props.theme].secondary}`};
`

const SearchInput = styled(InputBase)`
  width: 100%;
  background: transparent;
  font-size: 34px !important;
  font-weight: 600 !important;
  color: white;
  outline: none;
  padding: 4px 12px;
`

const SearchButtonContainer = styled.div`
    height: 65px;
    width: 70px;
    justify-content: center;
    display: flex;
    align-items: center;
    background-color: ${props => appColors[props.theme].secondary} !important;
    border-radius: 16px !important;
    cursor: pointer;
    box-shadow: -1px 0px 18px -5px rgba(255, 255, 255, 0.25);
`

const SearchIcon = styled.span`
    font-size: 24px;
`

const Row = styled.div`
    display: flex;
    width: 100%;
`

const ResultContainer = styled.div`
  /* margin-top: 24px; */
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 740px;
  opacity: ${props => props.isRequest ? 0.5 : 1};
  transition: opacity 0.3s;
`

const SortContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-bottom: 8px;
`

const FullWidth = styled.div`
    width: 100%;
    margin-right: 16px;
`

const AdvancedSearch = (props) => {
    let location = useLocation();
    const [openSnackBar, setOpenSnackBar] = useState(false);
    const [queryFilters, setQueryFilters] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchValue, setSearchValue] = useState("");
    const [activatedFilters, setActivatedFilters] = useState(null)
    const [refresh, setRefresh] = useState(0);
    const [isSearchbarActive, setIsSearchbarActive] = useState(false);

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        setQueryFilters(getFiltersWithQuery(queryParams));

        // if (!query) {
        //     props.search();
        // }

        // if (searchValue === "") {
        //     setSearchValue(findValueFromQuery(queryFilters, "term"));
        // }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location])

    const onFiltersChange = (activatedFilters) => {
        // console.log("FIND TERM", findValueFromQuery(activatedFilters.chip, "term"))
        console.log("ON FILTERS CHANGE", activatedFilters);
        console.log("ON FILTERS CHANGE PROPS", props.activatedFilters);
        // const term = findValueFromQuery(activatedFilters?.chip, "term");

        // if (!term || term === "") {
        //     setSearchValue("")
        // }
        setRefresh(prev => prev + 1);

        const copyFilters = JSON.parse(JSON.stringify(activatedFilters));
        props.setFilters(copyFilters);

        props.search(copyFilters?.front);

        setActivatedFilters(copyFilters);
        props.setActivatedFiltersAction(copyFilters);
        const url = props.match.path + "?" + generateParams(copyFilters?.front);
        props.history.replace(url);
    }

    const searchInputClick = () => {
        setSearchTerm(searchValue);
    }

    //Handle "Enter" Key
    const onKeyPressed = (evt) => {
        if (evt.key === "Enter") {
            searchInputClick()
            evt.preventDefault();
        }
    }

    useEffect(() => {
        if (props.correctIds.length > 0 && activatedFilters) {
            const alreadyCorrectIds = [];

            Object.keys(activatedFilters?.chip).forEach(filterKey => {
                props.correctIds.forEach(correctData => {
                    if (filterKey === correctData.name) {
                        let isCompany = false;

                        if (correctData.name === "companies") {
                            isCompany = true;
                        }

                        let filterValue = activatedFilters.chip[filterKey].split(",");

                        filterValue.forEach(value => {
                            correctData.result.forEach(data => {
                                const id = isCompany ? data.company.id : data.id;
                                if (!alreadyCorrectIds.includes(id) && id === parseInt(value)) {
                                    isCompany ? filterValue.push(data.company.name) : filterValue.push(data.name)
                                    filterValue = filterValue.filter(item => parseInt(item) !== id)
                                    alreadyCorrectIds.push(id);
                                }
                            })
                        })

                        const correctFilters = filterValue.join(",");


                        activatedFilters.chip = replace(activatedFilters.chip, filterKey, correctFilters);

                    }
                })
            })
            console.log("EEEND", activatedFilters)
            props.setIsCorrectIds(true);
            onFiltersChange(activatedFilters);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.correctIds, activatedFilters])

    // useEffect(() => {
    //     console.log("ACTIVATED FILTERS", activatedFilters, queryFilters);
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [activatedFilters, queryFilters])

    const handleScroll = () => {
        // console.log("OFFSET HEIGHT", document.body.offsetHeight)
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 600) {
            props.moreSearchResult();
        }
    }

    const handleSortChange = (sort) => {
        const filters = addAndGroupElem(JSON.parse(JSON.stringify(props.activatedFilters)), "sort", sort, sort, true);
        onFiltersChange(filters);
    }


    useEffect(() => {
        // props.search();
        window.addEventListener("scroll", handleScroll);

        props.setRouteIndex(RouteIndex.SEARCH);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            setActivatedFilters(null);
            props.setFilters([]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (props.isErrorOccurred) {
            console.log("ERROR SHOW SNACKBAR", props.isErrorOccurred)
            setOpenSnackBar(props.isErrorOccurred)
        }
    }, [props.isErrorOccurred])

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        props.setIsErrorOccurred(false);

        setOpenSnackBar(false);
    };

    return (
        <Padding>
            <Snackbar open={openSnackBar} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: "top", horizontal: "right" }}>
                <Alert onClose={handleClose} severity="error">
                    Sorry, a error occured, please try again.
                </Alert>
            </Snackbar>
            <SearchContainer>
                <SearchBar isActive={isSearchbarActive} theme={props.theme}>
                    <SearchInput
                        placeholder={"Search and discover new games"}
                        onChange={(evt) => { console.log("ON CHANGE TEXT", evt.target.value); setSearchValue(evt.target.value) }}
                        value={searchValue}
                        onKeyPress={onKeyPressed}
                        onClick={() => setIsSearchbarActive(true)}
                        onBlur={() => setIsSearchbarActive(false)}
                    />
                    <SearchButtonContainer onClick={searchInputClick} theme={props.theme}>
                        <SearchIcon className="icon-search" />
                    </SearchButtonContainer>
                </SearchBar>
            </SearchContainer>
            <TermChip activatedFilters={JSON.parse(JSON.stringify(activatedFilters))} onChangeFilters={onFiltersChange} />

            <Row>
                <FullWidth>
                    <SortContainer >
                        <SelectSort onChange={(sort) => handleSortChange(sort)} />
                    </SortContainer>
                    <ResultContainer isRequest={props.isRequest}>
                        {!props.searchResult && Array.from(Array(20), (e, i) => {
                            return (
                                <SearchResultCard key={i} loading={true} theme={props.theme}/>
                            )
                        })}
                        {props.searchResult && props.searchResult.map((res, i) => {
                            return (
                                <SearchResultCard
                                    key={i}
                                    game={res.name}
                                    developer={res.company?.name}
                                    date={res.releaseDate}
                                    platforms={res.platforms}
                                    coverId={res.coverID}
                                    rating={res.rating}
                                    screenshots={res.screenshots}
                                    genres={res.genres}
                                    theme={props.theme}
                                />
                            )
                        })}
                        {props.moreResIsRequest && (
                            <Center margin={"12px 0"}>
                                <CircularProgress />
                            </Center>
                        )}
                    </ResultContainer>
                </FullWidth>
                <HandleFilters queryFilters={queryFilters} onChange={onFiltersChange} term={searchTerm} refresh={refresh} />
            </Row>
        </Padding>
    );
}

const actionCreators = {
    setRouteIndex,
    search,
    setIsCorrectIds,
    moreSearchResult,
    setActivatedFiltersAction,
    setFilters,
    setIsErrorOccurred
}

function mapStateToProps(state) {
    return {
        searchResult: state.filtersReducer.searchResult,
        correctIds: state.filtersReducer.correctIds,
        moreResIsRequest: state.filtersReducer.moreResIsRequest,
        isRequest: state.filtersReducer.isRequest,
        activatedFilters: state.filtersReducer.filters,
        isFiltersLoaded: state.filtersReducer.isFiltersLoaded,
        isErrorOccurred: state.uiReducer.isErrorOccurred,
        theme: state.uiReducer.theme
    };
}

export default compose(
    withRouter,
    connect(
        mapStateToProps,
        actionCreators
    )
)(AdvancedSearch);
