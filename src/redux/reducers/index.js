import homePageRequests from "./homePageRequestsReducer";
import uiReducer from "./uiReducer"; 
import filtersReducer from './filtersReducer';
import {combineReducers} from "redux";

const reducers = combineReducers({
    homePageRequests,
    uiReducer,
    filtersReducer
})

export default reducers;