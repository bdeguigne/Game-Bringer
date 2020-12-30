import { uiConstants } from "../constants/uiConstants";

let defaultState = {
    menuExpanded: false
}

function UIReducer(state = defaultState, action) {
    switch (action.type) {
        case uiConstants.EXPANDED_MENU_STATE:
            return {
                ...state,
                menuExpanded: !state.menuExpanded
            }
        default:
            return state
    }
}

export default UIReducer;