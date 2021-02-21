import homePageRequests from "./homePageRequestsReducer";
import uiReducer from "./uiReducer"; 
import filtersReducer from './filtersReducer';
import gameDetailsReducer from './gameDetailsReducer';
import {combineReducers} from "redux";

const reducers = combineReducers({
    homePageRequests,
    uiReducer,
    filtersReducer,
    gameDetailsReducer
})

export default reducers;