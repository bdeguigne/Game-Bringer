import { gameDetailsConstants } from "../constants/gameDetailsConstants";

let defaultState = {
    game: {}
}

function gameDetailsReducer(state = defaultState, action) {
    switch (action.type) {
        case gameDetailsConstants.SET_GAME:
            return {
                ...state,
                game: action.data
            }
        default:
            return state
    }
}

export default gameDetailsReducer;