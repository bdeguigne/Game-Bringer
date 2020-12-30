// import { RecentlyReleasedConstants } from "../constants/RecentlyReleasedConstants";

// let defaultState = {
//     recentlyReleasedGames: [],
//     isRequestComplete: false,
//     totalRecentlyReleasedGames: 0,
// }

// function RecentlyReleasedReducer(state = defaultState, action) {
//     switch (action.type) {
//         case RecentlyReleasedConstants.ADD_RECENT_GAME:
//             return {
//                 ...state,
//                 recentlyReleasedGames: [...state.recentlyReleasedGames, action.data]
//             }
//         case RecentlyReleasedConstants.RECENTLY_RELEASED_IS_REQUEST:
//             return {
//                 ...state,
//                 isRequestComplete: !state.isRequest
//             }
//         case RecentlyReleasedConstants.RECENTLY_RELEASED_SET_TOTAL_GAMES:
//             return {
//                 ...state,
//                 totalRecentlyReleasedGames: action.total
//             }
//         default:
//             return state;
//     }
// }

// export default RecentlyReleasedReducer;