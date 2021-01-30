import { uiConstants, RouteIndex } from "../constants/uiConstants";

let defaultState = {
    index: RouteIndex.HOMEPAGE,
    isCorrectIds: false,
    activatedFilters: {},
    refreshFilters: 0
}

function UIReducer(state = defaultState, action) {
    switch (action.type) {
        case uiConstants.ROUTE_INDEX_STATE:
            return {
                ...state,
                index: action.index
            }
        case uiConstants.FILTERS_CORRECT_IDS:
            return {
                ...state,
                isCorrectIds: action.state
            }
        case uiConstants.SET_ACTIVATED_FILTERS:
            return {
                ...state,
                activatedFilters: action.activatedFilters,
                refreshFilters: state.refreshFilters + 1
            }
        default:
            return state
    }
}

export default UIReducer;