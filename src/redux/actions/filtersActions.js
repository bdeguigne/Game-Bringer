import { getFilterRequest, searchByNameRequest, searchRequest, correctIdsRequest } from '../services/filtersService';
import { filtersConstants } from '../constants/filtersConstants'
import { findDeveloper, getElapsedTime } from '../../utils/requestFormat';
import moment from 'moment';

export const getFilters = () => {
    return (dispatch) => {
        getFilterRequest()
            .then(res => res.json())
            .then(res => {
                let genres = [];
                let modes = [];
                let perspective = [];

                // console.log("GET FILTERS RESULT ", res);
                res.forEach(element => {
                    if (element.name === "Genres") {
                        genres = element.result
                    } else if (element.name === "Modes") {
                        modes = element.result;
                    } else if (element.name === "Perspectives") {
                        perspective = element.result;
                    } else {
                        console.log("getFilters error");
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

            })
            .catch(error => console.log("getFilters error", error))
    }
}

export const searchByName = (endpoint, searchEntry, slug, exclude) => {
    return (dispatch) => {
        dispatch({
            type: filtersConstants.TEXTFIELDS_RES_REQUEST
        })
        searchByNameRequest(endpoint, searchEntry, exclude)
            .then(res => res.json())
            .then(res => {
                // console.log("SEARCH BY NAME RES", slug);

                dispatch({
                    type: filtersConstants.SET_TEXTFIELDS_SEARCH_RES,
                    res: {
                        [slug]: res
                    }
                })
            })
            .catch(error => console.log("getFilters error", error))
    }
}

export const correctIds = (needRequestArray) => {
    const genQuery = () => {
        console.log("REDUX ", needRequestArray)
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
                queryData.push({
                    endpoint: `${filter.slug}`,
                    name: filter.slug,
                    fields: "name",
                    condition: `id = (${filter.ids.join(",")})`
                })
            }
        })

        return queryData;
    }

    return (dispatch) => {
        const queryData = genQuery();
        console.log("QUERY GEN", queryData);
        correctIdsRequest(queryData)
            .then(res => res.json())
            .then(res => {
                console.log("CORRECT IDS RES", res);
                dispatch({
                    type: filtersConstants.SET_CORRECT_IDS,
                    data: res
                })
            })
            .catch(err => console.log("error CorrectIds", err))
    }
}

export const search = (filters) => {
    function generateFilterQuery() {

        let filtersQueryArray = [];

        if (filters) {
            Object.keys(filters).forEach(key => {
                // console.log("OBJ", key);

                switch (key) {
                    case "term":
                        const searchTerm = `name ~ *"${filters[key]}"*`;
                        filtersQueryArray.push(searchTerm);
                        break;
                    case "rating":
                        const [min, max] = filters[key].split(",");

                        const formatFiltersRates = `aggregated_rating >= ${min} & aggregated_rating <= ${max} & aggregated_rating != null`;
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
                            const dateQuery = `first_release_date >= ${unixYear} & first_release_date <= ${unixYearEnd}`;
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

        return filtersQuery !== "" ? filtersQuery : null;
    }

    return (dispatch) => {
        const query = generateFilterQuery();

        searchRequest(query)
            .then(res => res.json())
            .then(res => {
                let searchResults = [];

                res.forEach(game => {
                    const name = game.name;
                    const company = findDeveloper(game.involved_companies);
                    const releaseDate = getElapsedTime(game.release_dates, game.first_release_date);
                    const platforms = game.platforms;
                    const coverID = game.cover ? game.cover.image_id : null;
                    const rating = Math.round(game.aggregated_rating);

                    searchResults.push({
                        name,
                        company,
                        releaseDate,
                        platforms,
                        coverID,
                        rating
                    })
                })
                // console.log("SEARCH RES", searchResults);
                dispatch({
                    type: filtersConstants.SET_SEARCH_RESULTS,
                    data: searchResults
                })
            })
            .catch(err => console.log("search error", err))
    }

}