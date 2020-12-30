import {uiConstants} from "../constants/uiConstants";

export const expandMenuState = () => {
    return dispatch => {
        dispatch({
            type: uiConstants.EXPANDED_MENU_STATE
        })
    }
}