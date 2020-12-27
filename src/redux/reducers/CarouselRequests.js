import { CarouselRequestsConstants } from "../constants/CarouselRequestsConstants";

let defaultState = {
    popularGames: [],
    popularGamesData: [],
    isRequestComplete: false,
    genres: []
};

function CarouselRequestsReducer(state = defaultState, action) {
    switch (action.type) {
        case CarouselRequestsConstants.SET_POPULAR_GAMES:
            return {
                ...state,
                popularGames: action.popularGames
            }
        case CarouselRequestsConstants.ADD_POPULAR_GAME_DATA:
            return {
                ...state,
                popularGamesData: [...state.popularGamesData, action.data]
            }
        case CarouselRequestsConstants.POPULAR_GAMES_COMPLETE:
            return {
                ...state,
                isRequestComplete: !state.isRequestComplete
            }
        case CarouselRequestsConstants.STORE_GENRES:
            return {
                ...state,
                genres: action.genres
            }
        default:
            return state
    }
};

export default CarouselRequestsReducer;