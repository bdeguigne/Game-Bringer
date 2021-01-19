import { uiConstants, RouteIndex } from "../constants/uiConstants";

let defaultState = {
    index: RouteIndex.HOMEPAGE
}

function UIReducer(state = defaultState, action) {
    switch (action.type) {
        case uiConstants.ROUTE_INDEX_STATE:
            return {
                ...state,
                index: action.index
            }
        default:
            return state
    }
}

export default UIReducer;