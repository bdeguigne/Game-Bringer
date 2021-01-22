import { getFilterRequest, searchByNameRequest } from '../services/filtersService';
import { filtersConstants } from '../constants/filtersConstants'

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

export const searchByName = (endpoint, searchEntry, slug) => {
    return (dispatch) => {
        dispatch({
            type: filtersConstants.TEXTFIELDS_RES_REQUEST
        })
        searchByNameRequest(endpoint, searchEntry)
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