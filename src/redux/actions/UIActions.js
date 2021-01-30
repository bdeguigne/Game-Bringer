import {uiConstants} from "../constants/uiConstants";

export const setRouteIndex = (index) => {
    return dispatch => {
        dispatch({
            index,
            type: uiConstants.ROUTE_INDEX_STATE
        })
    }
}

export const setIsCorrectIds = (state) => {
    return dispatch => {
        dispatch({
            type: uiConstants.FILTERS_CORRECT_IDS,
            state
        })
    }
}

export const setActivatedFiltersAction = (activatedFilters) => {
    return dispatch => {
        dispatch({
            type: uiConstants.SET_ACTIVATED_FILTERS,
            activatedFilters
        })
    }
}