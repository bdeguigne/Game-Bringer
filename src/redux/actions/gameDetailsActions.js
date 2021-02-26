import { getGameDetailsRequest } from '../services/gameDetailsService'
import { handleError } from '../services/request';
import { gameDetailsConstants } from '../constants/gameDetailsConstants'
import { getElapsedTime, findCompany } from '../../utils/requestFormat'

export const getGameDetails = (id) => {
    return (dispatch) => {
        getGameDetailsRequest(id)
            .then(res => {
                if (handleError("more search error", res, dispatch)) {
                    return;
                }
                return res.json();
            })
            .then(res => {
                console.log("RESSS", res);
                if (res && res[0]) {
                    const game = res[0];

                    const gameInfo = {
                        name: game.name,
                        genres: game.genres,
                        screenshots: game.screenshots,
                        banner: game.screenshots ? (game.screenshots[Math.floor(Math.random() * game.screenshots.length)]).image_id : null,
                        coverId: game.cover.image_id,
                        releaseDate: getElapsedTime(game.release_dates, game.first_release_date),
                        releaseDates: game.release_dates,
                        company: findCompany(game.involved_companies),
                        developers: findCompany(game.involved_companies, "developer"),
                        publishers: findCompany(game.involved_companies, "publisher"),
                        userRating: {
                            rate: Math.round(game.rating),
                            count: game.rating_count
                        },
                        aggregated_rating: {
                            rate: Math.round(game.aggregated_rating),
                            count: game.aggregated_rating_count
                        },
                        videos: game.videos,
                        platforms: game.platforms,
                        websites: game.websites,
                        summary: game.summary,
                        storyline: game.storyline,
                        gameModes: game.game_modes,
                        themes: game.themes,
                        playerPerspectives: game.player_perspectives,
                        gameEngines: game.game_engines
                    }

                    dispatch({
                        type: gameDetailsConstants.SET_GAME,
                        data: gameInfo
                    })
                }
            })
    }
}

export const clearGameDetails = () => {
    return dispatch => {
        dispatch({
            type: gameDetailsConstants.SET_GAME,
            data: {}
        })
    }
}