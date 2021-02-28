import { priceConstants } from '../constants/priceConstants';

let defaultState = {
    stores: JSON.parse(localStorage.getItem("stores")) || [],
    bestPrices: []
}

function priceReducer(state = defaultState, action) {
    switch (action.type) {
        case priceConstants.SET_STORES: 
            return {
                ...state,
                stores: action.stores
            }
        case priceConstants.SET_BEST_PRICES:
            return {
                ...state,
                bestPrices: action.data
            }
        default:
            return state
    }
}

export default priceReducer;