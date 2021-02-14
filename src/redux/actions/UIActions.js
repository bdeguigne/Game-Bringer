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

export const setIsNeedRequest = (state) => {
    return dispatch => {
        dispatch({
            type: uiConstants.SET_IS_NEED_REQUEST,
            state
        })
    }
}

export const setIsErrorOccurred = (state) => {
    return dispatch => {
        dispatch({
            type: uiConstants.SET_IS_ERROR_OCCURRED,
            state
        })
    }
}