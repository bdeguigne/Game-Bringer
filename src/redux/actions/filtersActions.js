import { getFilterRequest, searchByNameRequest, searchRequest, correctIdsRequest } from '../services/filtersService';
import { filtersConstants } from '../constants/filtersConstants'
import { findCompany, getElapsedTime } from '../../utils/requestFormat';
import { handleError } from '../services/request';
import moment from 'moment';

export const getFilters = () => {
    return (dispatch) => {
        getFilterRequest()
            .then(res => {
                if (handleError("getFilters error", res, dispatch)) {
                    return;
                }

                return res.json();
            })
            .then(res => {
                if (res) {

                    let genres = [];
                    let modes = [];
                    let perspective = [];

                    res.forEach(element => {
                        if (element.name === "Genres") {
                            genres = element.result
                        } else if (element.name === "Modes") {
                            modes = element.result;
                        } else if (element.name === "Perspectives") {
                            perspective = element.result;
                        } else {
                        }
                    });

                    dispatch({
                        type: filtersConstants.GET_GENRES,
                        data: genres
                    })
                    dispatch({
                        type: filtersConstants.GET_MODES,
                        data: modes
                    })
                    dispatch({
                        type: filtersConstants.GET_PERSPECTIVE,
                        data: perspective
                    })
                }
            })
    }
}

export const setFilters = (filters) => {
    return (dispatch) => {
        dispatch({
            type: filtersConstants.SET_FILTERS,
            data: filters
        })
    }
}

export const setIsFiltersLoaded = (state) => {
    return (dispatch) => {
        dispatch({
            type: filtersConstants.SET_IS_FILTERS_LOADED,
            state
        })
    }
}

export const searchByName = (endpoint, searchEntry, slug, exclude) => {
    return (dispatch) => {
        dispatch({
            type: filtersConstants.TEXTFIELDS_RES_REQUEST
        })
        searchByNameRequest(endpoint, searchEntry, exclude)
            .then(res => {
                if (handleError("Search by name error", res, dispatch)) {
                    return;
                }
                return res.json();
            })
            .then(res => {
                if (res) {
                    dispatch({
                        type: filtersConstants.SET_TEXTFIELDS_SEARCH_RES,
                        res: {
                            [slug]: res
                        }
                    })
                }
            })
    }
}

export const correctIds = (needRequestArray) => {
    const genQuery = () => {
        const queryData = []

        needRequestArray.forEach(filter => {
            if (filter.slug === "companies") {
                queryData.push({
                    endpoint: "involved_companies",
                    name: filter.slug,
                    fields: "company.name",
                    condition: `company = (${filter.ids.join(",")})`
                })
            } else {
                if (filter.slug !== "rating") {
                    queryData.push({
                        endpoint: `${filter.slug}`,
                        name: filter.slug,
                        fields: "name",
                        condition: `id = (${filter.ids.join(",")})`
                    })
                }
            }
        })

        return queryData;
    }

    return (dispatch) => {
        const queryData = genQuery();
        correctIdsRequest(queryData)
            .then(res => {
                if (handleError("error CorrectIds", res, dispatch)) {
                    return;
                }
                return res.json();
            })
            .then(res => {
                if (res) {
                    dispatch({
                        type: filtersConstants.SET_CORRECT_IDS,
                        data: res
                    })
                }
            })
    }
}

function generateFilterQuery(filters) {

    let filtersQueryArray = [];
    let sortValue = null;

    if (filters) {
        Object.keys(filters).forEach(key => {
            switch (key) {
                case "sort":
                    sortValue = filters[key].replace("-", " ");

                    const getSort = sortValue.split(" ");

                    if (getSort[0] === "aggregated_rating") {
                        filtersQueryArray.push("aggregated_rating != null");
                    } else {
                        filtersQueryArray.push("first_release_date != null");
                    }

                    break;
                case "term":
                    const searchTerm = `name ~ *"${filters[key]}"*`;
                    filtersQueryArray.push(searchTerm);
                    break;
                case "rating":
                    const [min, max] = filters[key].split(",");

                    const formatFiltersRates = `aggregated_rating >= ${min} & aggregated_rating <= ${max}`;
                    filtersQueryArray.push(formatFiltersRates);
                    break
                case "companies":
                    const formatFiltersCompanies = "involved_companies.company = (" + filters[key].split(",").map(filter => `${filter}`).join(',') + ")";
                    filtersQueryArray.push(formatFiltersCompanies);
                    break;
                case "year":
                    const years = filters[key].split(",");
                    const datesQuery = []

                    years.forEach(year => {
                        const unixYear = moment({ year }).format("X");
                        const unixYearEnd = moment({ year }).add(1, 'y').format("X");
                        const dateQuery = `(first_release_date >= ${unixYear} & first_release_date <= ${unixYearEnd})`;
                        datesQuery.push(dateQuery);
                    })
                    filtersQueryArray.push(datesQuery.join(" | "));
                    break;
                default:
                    if (filters[key] !== "") {
                        const formatFilters = key + " = [" + filters[key].split(",").map(filter => `${filter}`).join(',') + "]";
                        filtersQueryArray.push(formatFilters);
                    }
            }
        })
    }

    const filtersQuery = filtersQueryArray.join(" & ");

    return {
        query: filtersQuery !== "" ? filtersQuery : null,
        sort: sortValue
    }
}

const grabSearchResult = (res) => {
    let searchResults = [];

    res.forEach(game => {
        const id = game.id;
        const name = game.name;
        const company = findCompany(game.involved_companies);
        const releaseDate = getElapsedTime(game.release_dates, game.first_release_date);
        const platforms = game.platforms;
        const coverID = game.cover ? game.cover.image_id : null;
        const rating = Math.round(game.aggregated_rating);
        const screenshots = game.screenshots;
        const genres = game.genres;

        searchResults.push({
            id,
            name,
            company,
            releaseDate,
            platforms,
            coverID,
            rating,
            screenshots,
            genres
        })
    })

    return searchResults;
}

export const search = (filters) => {

    return (dispatch, getState) => {

        const queryFilters = generateFilterQuery(filters);
        const query = queryFilters.query;
        const storedFilters = getState().filtersReducer.lastRequestFilters;

        if ((!storedFilters || !filters) || JSON.stringify(storedFilters) !== JSON.stringify(filters)) {
            var filtersCopy = null;
            if (filters) {
                filtersCopy = JSON.parse(JSON.stringify(filters))
            }
            dispatch({
                type: filtersConstants.SET_IS_REQUEST,
                state: true
            })
            dispatch({
                type: filtersConstants.SET_OFFSET,
                offset: 0
            })
            dispatch({
                type: filtersConstants.SET_REACH_END,
                state: false
            })
            dispatch({
                type: filtersConstants.SET_LAST_REQUEST_FILTERS,
                data: filtersCopy || filters
            })

            searchRequest(query, queryFilters.sort, 0)
                .then(res => {
                    if (handleError("search error", res, dispatch)) {
                        return;
                    }
                    return res.json();
                })
                .then(res => {
                    if (res) {
                        const searchResults = grabSearchResult(res);
                        dispatch({
                            type: filtersConstants.SET_SEARCH_RESULTS,
                            data: searchResults
                        })

                        dispatch({
                            type: filtersConstants.SET_OFFSET,
                            offset: 20
                        })

                        dispatch({
                            type: filtersConstants.SET_IS_REQUEST,
                            state: false
                        })

                        dispatch({
                            type: filtersConstants.SET_LINK_FILTERS,
                            data: {}
                        })
                    }
                })
        }
    }
}

export const moreSearchResult = () => {
    return (dispatch, getState) => {
        const moreResIsRequest = getState().filtersReducer.moreResIsRequest;
        const currentOffset = getState().filtersReducer.offset;
        const isReachEnd = getState().filtersReducer.reachEnd;
        const filters = getState().filtersReducer.filters?.front;

        if (moreResIsRequest === false && isReachEnd === false) {
            dispatch({
                type: filtersConstants.SET_REACH_BOTTOM,
                state: true
            })

            const queryFilters = generateFilterQuery(filters);
            const query = queryFilters.query;

            searchRequest(query, queryFilters.sort, currentOffset)
                .then(res => {
                    if (handleError("more search error", res, dispatch)) {
                        return;
                    }
                    return res.json();
                })
                .then(res => {
                    if (res) {
                        const searchResults = grabSearchResult(res);

                        if (searchResults.length > 0) {
                            dispatch({
                                type: filtersConstants.MORE_SEARCH_RESULTS,
                                res: searchResults
                            })

                            dispatch({
                                type: filtersConstants.SET_OFFSET,
                                offset: currentOffset + 20
                            })

                            dispatch({
                                type: filtersConstants.SET_REACH_BOTTOM,
                                state: false
                            })
                        } else {
                            dispatch({
                                type: filtersConstants.SET_REACH_END,
                                state: true
                            })

                            dispatch({
                                type: filtersConstants.SET_REACH_BOTTOM,
                                state: false
                            })
                        }
                    }
                })
        }
    }
}

export const setFiltersUrl = (url) => {
    return dispatch => {
        dispatch({
            type: filtersConstants.SET_URL,
            url
        })
    }
}

export const setLinkFilters = (filters) => {
    return  dispatch => {
        dispatch({
            type: filtersConstants.SET_LINK_FILTERS,
            data: filters
        })
    }
}