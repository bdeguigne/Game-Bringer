import {uiConstants} from "../constants/uiConstants";

export const setRouteIndex = (index) => {
    return dispatch => {
        dispatch({
            index,
            type: uiConstants.ROUTE_INDEX_STATE
        })
    }
}