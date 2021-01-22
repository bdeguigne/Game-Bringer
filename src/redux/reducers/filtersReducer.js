import { filtersConstants } from '../constants/filtersConstants'

let defaultState = {
    genres: [],
    modes: [],
    perspectives: [],
    searchResult: {
        isRequest: false,
        res: []
    }
}

function filtersReducer(state = defaultState, action) {
    switch (action.type) {
        case filtersConstants.GET_GENRES:
            return {
                ...state,
                genres: action.data
            }
        case filtersConstants.GET_MODES:
            return {
                ...state,
                modes: action.data
            }
        case filtersConstants.GET_PERSPECTIVE:
            return {
                ...state,
                perspectives: action.data
            }
        case filtersConstants.SET_TEXTFIELDS_SEARCH_RES:
            return {
                ...state,
                searchResult: {
                    res: [...state.searchResult.res, action.res],
                    isRequest: false
                }
            }
        case filtersConstants.TEXTFIELDS_RES_REQUEST:
            return {
                ...state,
                searchResult: {
                    ...state.searchResult,
                    isRequest: true
                }
            }
        default:
            return state
    }
}

export default filtersReducer;