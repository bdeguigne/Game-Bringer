import homePageRequests from "./homePageRequestsReducer";
import uiReducer from "./uiReducer"; 
import filtersReducer from './filtersReducer';
import gameDetailsReducer from './gameDetailsReducer';
import priceReducer from './priceReducer';
import {combineReducers} from "redux";

const reducers = combineReducers({
    homePageRequests,
    uiReducer,
    filtersReducer,
    gameDetailsReducer,
    priceReducer
})

export default reducers;