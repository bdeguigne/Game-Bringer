import { filtersConstants } from '../constants/filtersConstants'

let defaultState = {
    genres: [],
    modes: [],
    perspectives: [],
    textFieldSearchResult: {
        isRequest: false,
        res: []
    },
    filters: [],
    searchResult: null,
    correctIds: [],
    moreResIsRequest: false,
    offset: 0,
    reachEnd: false,
    isRequest: false,
    isFiltersLoaded: false
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
        case filtersConstants.SET_REACH_BOTTOM:
            return {
                ...state,
                moreResIsRequest: action.state
            }
        case filtersConstants.MORE_SEARCH_RESULTS:
            return {
                ...state,
                searchResult: [...state.searchResult, ...action.res]
            }
        case filtersConstants.SET_OFFSET:
            return {
                ...state,
                offset: action.offset
            }
        case filtersConstants.SET_REACH_END:
            return {
                ...state,
                reachEnd: action.state
            }
        case filtersConstants.SET_FILTERS:
            return {
                ...state,
                filters: action.data
            }
        case filtersConstants.SET_IS_REQUEST:
            return {
                ...state,
                isRequest: action.state
            }
        case filtersConstants.SET_IS_FILTERS_LOADED:
            return {
                ...state,
                isFiltersLoaded: action.state
            }
        default:
            return state
    }
}

export default filtersReducer;