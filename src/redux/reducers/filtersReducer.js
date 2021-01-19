import {filtersConstants} from '../constants/filtersConstants'

let defaultState = {
    genres: [],
    modes: [],
    perspectives: []
}

function filtersReducer(state = defaultState, action) {
    switch (action.type) {
        case filtersConstants.GET_GENRES :
            return {
                ...state,
                genres: action.data
            }
            case filtersConstants.GET_MODES :
            return {
                ...state,
                modes: action.data
            }
            case filtersConstants.GET_PERSPECTIVE :
            return {
                ...state,
                perspectives: action.data
            }
        default:
            return state
    }
}

export default filtersReducer;