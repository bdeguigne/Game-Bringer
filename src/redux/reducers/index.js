import homePageRequests from "./homePageRequestsReducer";
import uiReducer from "./uiReducer"; 
import {combineReducers} from "redux";

const reducers = combineReducers({
    homePageRequests,
    uiReducer
})

export default reducers;