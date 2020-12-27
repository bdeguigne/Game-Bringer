import CarouselRequests from "./CarouselRequests";
import RecentlyReleased from "./RecentlyReleased";
import homePageRequests from "./homePageRequestsReducer";
import {combineReducers} from "redux";

const reducers = combineReducers({
    CarouselRequests,
    RecentlyReleased,
    homePageRequests
})

export default reducers;