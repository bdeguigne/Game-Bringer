import { homePageRequestsConstants, bestRatedGames } from '../constants/homePageRequestsConstants';

let defaultState = {
    popularGames: [],
    recentlyReleasedGames: [],
    comingSoonGames: [],
    bestRatedGamesThisMonth: [],
    bestRatedGamesLast6Months: [],
    bestRatedGamesThisYear: [],
    bestRatedGamesAllTime: [],
    anticipatedGames: []
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
        case bestRatedGames.THIS_MONTH:
            return {
                ...state,
                bestRatedGamesThisMonth: action.games
            }
        case bestRatedGames.LAST_6_MONTHS:
            return {
                ...state,
                bestRatedGamesLast6Months: action.games
            }
        case bestRatedGames.THIS_YEAR:
            return {
                ...state,
                bestRatedGamesThisYear: action.games
            }
        case bestRatedGames.ALL_TIME:
            return {
                ...state,
                bestRatedGamesAllTime: action.games
            }
        case homePageRequestsConstants.SET_ANTICIPATED_GAMES:
            return {
                ...state,
                anticipatedGames: action.games
            }
        default:
            return state
    }
}

export default homePageRequestsReducer;