import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import styled from "styled-components";
import { appColors, Center } from "../../utils/styles";
import { InputBase, CircularProgress } from "@material-ui/core";
import { setRouteIndex, setIsCorrectIds, setActivatedFiltersAction } from "../../redux/actions/UIActions";
import { search, moreSearchResult, setFilters } from '../../redux/actions/filtersActions';
import TermChip from "./ChipFilters";
import { RouteIndex } from "../../redux/constants/uiConstants";
import SearchResultCard from "./SearchResultCard";
import { Padding } from '../../utils/styles';
import HandleFilters from './HandleFilters';
import { useLocation, withRouter } from "react-router-dom";
import { generateParams, getFiltersWithQuery, findValueFromQuery, replace } from './Filters'
import { compose } from 'redux';

const SearchContainer = styled.div`
  width: 100%;
  height: 160px;
  display: flex;
  align-items: center;
`

const SearchBar = styled.div`
    transition: box-shadow 0.2s;
  border: 1px solid ${appColors.secondaryDarker};
  border-radius: 16px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color : ${appColors.backgroundContrast};
  box-shadow: ${props => props.isActive ? "0px 0px 12px 3px #6d5dd352, inset 0px 0px 8px #6D5DD3;" : "0px 0px 12px 3px rgba(0, 0, 0, 0.25), inset 0px 0px 8px #6D5DD3;"};
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
    background-color: ${appColors.secondary} !important;
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
  opacity: ${props => props.isRequest ? 0.5 : 1};
  transition: opacity 0.3s;
`

const AdvancedSearch = (props) => {
    let location = useLocation();
    const [queryFilters, setQueryFilters] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchValue, setSearchValue] = useState("");
    const [activatedFilters, setActivatedFilters] = useState(null)
    const [refresh, setRefresh] = useState(0);
    const [isSearchbarActive, setIsSearchbarActive] = useState(false);

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const query = getFiltersWithQuery(queryParams)
        setQueryFilters(getFiltersWithQuery(queryParams));

        console.log("QUERRRY", query);

        if (!query) {
            props.search();
        }

        if (searchValue === "") {
            setSearchValue(findValueFromQuery(queryFilters, "term"));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location])

    useEffect(() => {
        props.setRouteIndex(RouteIndex.SEARCH);
    }, [props]);

    const onFiltersChange = (activatedFilters) => {
        console.log(props.isFiltersLoaded)
        if (props.isFiltersLoaded) {
            console.log("CORRECT TRUE",activatedFilters )
        }
        console.log("ON FILTERS CHANGE", activatedFilters);
        props.search(activatedFilters.front);
        props.setFilters(JSON.parse(JSON.stringify(activatedFilters)));
        setRefresh(prev => prev + 1);

        setActivatedFilters(activatedFilters);
        props.setActivatedFiltersAction(activatedFilters);
        const url = props.match.path + "?" + generateParams(activatedFilters.front);

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
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            props.moreSearchResult();
        }
    }

    useEffect(() => {
        // props.search();
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Padding>
            <SearchContainer>
                <SearchBar isActive={isSearchbarActive}>
                    <SearchInput
                        placeholder={"Search and discover new games"}
                        onChange={(evt) => setSearchValue(evt.target.value)}
                        value={searchValue}
                        onKeyPress={onKeyPressed}
                        onClick={() => setIsSearchbarActive(true)}
                        onBlur={() => setIsSearchbarActive(false)}
                    />
                    <SearchButtonContainer onClick={searchInputClick}>
                        <SearchIcon className="icon-search" />
                    </SearchButtonContainer>
                </SearchBar>
            </SearchContainer>
            <TermChip activatedFilters={JSON.parse(JSON.stringify(activatedFilters))} onChangeFilters={onFiltersChange} />
            <Row>
                <ResultContainer isRequest={props.isRequest}>
                    {!props.searchResult && Array.from(Array(20), (e, i) => { return (
                         <SearchResultCard key={i} loading={true}/>
                    )})}
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
                            />
                        )
                    })}
                    {props.moreResIsRequest && (
                        <Center margin={"12px 0"}>
                            <CircularProgress />
                        </Center>
                    )}
                </ResultContainer>
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
    setFilters
}

function mapStateToProps(state) {
    return {
        searchResult: state.filtersReducer.searchResult,
        correctIds: state.filtersReducer.correctIds,
        moreResIsRequest: state.filtersReducer.moreResIsRequest,
        isRequest: state.filtersReducer.isRequest,
        isFiltersLoaded: state.filtersReducer.isFiltersLoaded
    };
}

export default compose(
    withRouter,
    connect(
        mapStateToProps,
        actionCreators
    )
)(AdvancedSearch);
