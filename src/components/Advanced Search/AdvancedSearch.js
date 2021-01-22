import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import styled from "styled-components";
import { appColors } from "../../utils/styles";
import { InputBase } from "@material-ui/core";
import { setRouteIndex } from "../../redux/actions/UIActions";
import TermChip from "./TermChip";
import { RouteIndex } from "../../redux/constants/uiConstants";
import SearchResultCard from "./SearchResultCard";
import { Padding } from '../../utils/styles';
import HandleFilters from './HandleFilters';
import { useLocation, withRouter } from "react-router-dom";
import { generateParams, getFiltersWithQuery, findValueFromQuery } from './filters'
import { compose } from 'redux';

const SearchContainer = styled.div`
  width: 100%;
  height: 160px;
  display: flex;
  align-items: center;
`

const SearchBar = styled.div`
  border: 1px solid ${appColors.secondaryDarker};
  border-radius: 16px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color : ${appColors.backgroundContrast};
  box-shadow: 0px 0px 12px 3px rgba(0, 0, 0, 0.25), inset 0px 0px 8px #6D5DD3;
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


const ResultContainer = styled.div`
  margin-top: 24px;
  display: flex;
`

const AdvancedSearch = (props) => {
    let location = useLocation();
    const [queryFilters, setQueryFilters] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchValue, setSearchValue] = useState("");

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        // console.log("QUERY PARAMS", queryParams);

        setQueryFilters(getFiltersWithQuery(queryParams));

        // console.log("SEARCH TERM", findValueFromQuery(queryFilters));

        if (searchValue === "") {
            setSearchValue(findValueFromQuery(queryFilters, "term"));
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location])

    useEffect(() => {
        props.setRouteIndex(RouteIndex.SEARCH);
    }, [props]);

    const onFiltersChange = (activatedFilters) => {
        
        const url = props.match.path + "?" + generateParams(activatedFilters);
        props.history.replace(url);

        // console.log("FIND RATINGS", findValueFromQuery(activatedFilters, "ratings").split(","));
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

    return (
        <Padding>
            <SearchContainer>
                <SearchBar>
                    <SearchInput 
                        placeholder={"Search and discover new games"}
                        onChange={(evt) => setSearchValue(evt.target.value)} 
                        value={searchValue}
                        onKeyPress={onKeyPressed}
                    />
                    <SearchButtonContainer onClick={searchInputClick}>
                        <SearchIcon className="icon-search"/>
                    </SearchButtonContainer>
                </SearchBar>
            </SearchContainer>
            <TermChip term={findValueFromQuery(queryFilters, "term")} />
            <ResultContainer>
                <SearchResultCard
                    game={"Marvel's Spider-Man: Miles Morales"}
                    developer={"Activision"}
                    date={{ elapsedTime: "2 months ago", date: "Dec 11, 2020" }}
                    platforms={[
                        {
                            "id": 6,
                            "name": "PC (Microsoft Windows)",
                            "platform_logo": {
                                "id": 203,
                                "image_id": "irwvwpl023f8y19tidgq"
                            }
                        },
                        {
                            "id": 48,
                            "name": "PlayStation 4",
                            "platform_logo": {
                                "id": 231,
                                "image_id": "pl6f"
                            }
                        },
                        {
                            "id": 49,
                            "name": "Xbox One",
                            "platform_logo": {
                                "id": 329,
                                "image_id": "pl95"
                            }
                        },
                        {
                            "id": 167,
                            "name": "PlayStation 5",
                            "platform_logo": {
                                "id": 463,
                                "image_id": "plcv"
                            }
                        },
                        {
                            "id": 169,
                            "name": "Xbox Series",
                            "platform_logo": {
                                "id": 561,
                                "image_id": "plfl"
                            }
                        },
                        {
                            "id": 170,
                            "name": "Google Stadia",
                            "platform_logo": {
                                "id": 328,
                                "image_id": "pl94"
                            }
                        }
                    ]}
                    coverId={"co2dwe"}
                    rating={83}
                />
                <HandleFilters queryFilters={queryFilters} onChange={onFiltersChange} term={searchTerm} />
            </ResultContainer>
        </Padding>
    );
}

const actionCreators = {
    setRouteIndex
}

function mapStateToProps(state) {
    return {};
}

export default compose(
    withRouter,
    connect(
        mapStateToProps,
        actionCreators
    )
)(AdvancedSearch);
