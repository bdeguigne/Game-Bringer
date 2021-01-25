import { getFilterRequest, searchByNameRequest, searchRequest} from '../services/filtersService';
import { filtersConstants } from '../constants/filtersConstants'
import { findDeveloper, getElapsedTime } from '../../utils/requestFormat';

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
                console.log("SEARCH BY NAME RES", slug);

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

export const search = (filters) => {
    function generateFilterQuery() {
        let filtersQueryArray = [];

        Object.keys(filters).forEach(key => {
            console.log("OBJ", key);

            switch (key) {
                case "term":
                    break;
                case "rating":
                    console.log("RATING");
                    break
                case "companies":
                    break
                default:
                    if (filters[key] !== "") {
                        const formatFilters = key + ".slug = (" + filters[key].split(",").map(filter => `"${filter}"`).join(',') + ")";
                        console.log("ELSE", formatFilters);
                        filtersQueryArray.push(formatFilters);
                    }
            }
        })

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
            console.log("SEARCH RES", searchResults);
            dispatch({
                type: filtersConstants.SET_SEARCH_RESULTS,
                data: searchResults
            })
        })
        .catch(err => console.log("search error", err))
    }

}