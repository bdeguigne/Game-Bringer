import { homePageRequestsConstants } from "../constants/homePageRequestsConstants";

let defaultState = {
    popularGames: [],
    popularGamesData: [],
    isRequestComplete: false,
    genres: []
};

function homePageRequestReducer(state = defaultState, action) {
    switch (action.type) {
        case homePageRequestsConstants.SET_POPULAR_GAMES:
            return {
                ...state,
                popularGames: action.popularGames
            }
        case homePageRequestsConstants.ADD_POPULAR_GAME_DATA:
            return {
                ...state,
                popularGamesData: [...state.popularGamesData, action.data]
            }
        case homePageRequestsConstants.POPULAR_GAMES_COMPLETE:
            return {
                ...state,
                isRequestComplete: !state.isRequestComplete
            }
        case homePageRequestsConstants.STORE_GENRES:
            return {
                ...state,
                genres: action.genres
            }
        default:
            return state
    }
};

export default homePageRequestReducer;