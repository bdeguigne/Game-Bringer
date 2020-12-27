import { homePageRequestsConstants } from '../constants/homePageRequestsConstants';

let defaultState = {
    popularGames: [],
    recentlyReleasedGames: [],
    comingSoonGames: []
}

function homePageRequestsReducer(state = defaultState, action) {
    switch (action.type) {
        case homePageRequestsConstants.SET_POPULAR_GAMES:
            return {
                ...state,
                popularGames: action.popularGames
            }
        case homePageRequestsConstants.SET_RECENTLY_RELEASED_GAMES:
            return {
                ...state,
                recentlyReleasedGames: action.games
            }
        case homePageRequestsConstants.SET_COMING_SOON_GAMES:
            return {
                ...state,
                comingSoonGames: action.games
            }
        default:
            return state
    }
}

export default homePageRequestsReducer;