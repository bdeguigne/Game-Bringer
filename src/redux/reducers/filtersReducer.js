import { filtersConstants } from '../constants/filtersConstants'

let defaultState = {
    genres: [],
    modes: [],
    perspectives: [],
    textFieldSearchResult: {
        isRequest: false,
        res: []
    },
    searchResult: [],
    correctIds: []
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
                textFieldSearchResult: {
                    res: [...state.textFieldSearchResult.res, action.res],
                    isRequest: false
                }
            }
        case filtersConstants.TEXTFIELDS_RES_REQUEST:
            return {
                ...state,
                textFieldSearchResult: {
                    ...state.textFieldSearchResult,
                    isRequest: true
                }
            }
        case filtersConstants.SET_SEARCH_RESULTS:
            return {
                ...state,
                searchResult: action.data
            }
        case filtersConstants.SET_CORRECT_IDS:
            return {
                ...state,
                correctIds: action.data
            }
        default:
            return state
    }
}

export default filtersReducer;