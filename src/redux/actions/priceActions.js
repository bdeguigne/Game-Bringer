import { getStoresRequest } from '../services/priceService';
import { handleError } from '../services/request';
import { priceConstants } from '../constants/priceConstants';

export const getStores = () => {
    return (dispatch, getState) => {
        const stores = getState().priceReducer.stores;

        if (stores.length === 0) {
            getStoresRequest()
                .then(res => {
                    if (handleError("get stores error", res, dispatch)) {
                        return;
                    }
                    return res.json();
                })
                .then(res => {
                    localStorage.setItem("stores", JSON.stringify(res));

                    dispatch({
                        type: priceConstants.SET_STORES,
                        stores: res
                    })
                })
        }
    }
}

export const clearPrices = () => {
    return dispatch => {
        dispatch({
            type: priceConstants.CLEAR_BEST_PRICES,
            data: {}
        })
    }
}