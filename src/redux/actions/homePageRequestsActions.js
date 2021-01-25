import { homePageRequestsConstants } from "../constants/homePageRequestsConstants";
import { getPopularGameRequest, getRecentlyReleasedRequest, getComingSoonGamesRequest, getBestRatedGamesRequest } from "../services/homePageRequestsServices";
import { findDeveloper, getElapsedTime, getRandom, getVideoTrailer} from '../../utils/requestFormat'

const grabGameData = (games) => {
    let storedIds = [];
    let gamesData = [];

    games.forEach(game => {
        if (game.game) {

            const gameID = game.game.id;

            //Check if the game is not already added
            if (gameID && !storedIds.includes(gameID)) {
                const id = game.game.id;
                const gameName = game.game.name;
                const coverID = game.game.cover ? game.game.cover.image_id : null;
                const genres = game.game.genres;
                const screenshots = game.game.screenshots;
                const releasedDate = getElapsedTime({date: game.date, category: game.category, human: game.human});
                const rating = Math.round(game.game.aggregated_rating);

                gamesData.push({
                    gameName,
                    coverID,
                    genres,
                    screenshots,
                    releasedDate,
                    rating,
                    id
                })
                storedIds.push(gameID);
            }
        }

    })

    return gamesData;
}


export const getPopularGames = () => {
    return (dispatch) => {
        getPopularGameRequest()
            .then(res => res.json())
            .then(res => {
                const popularGamesData = [];
                // console.log("POPULAR RES ", res);
                res.forEach(popularGame => {
                    const id = popularGame.id;
                    const game = popularGame.name;
                    const rating = Math.round(popularGame.aggregated_rating);
                    const genres = popularGame.genres;
                    const screenshotID = popularGame.screenshots ?  (popularGame.screenshots[Math.floor(Math.random() * popularGame.screenshots.length)]).image_id : null;
                    const videoID = getVideoTrailer(popularGame.videos);
                    const releaseDate = getElapsedTime(popularGame.release_dates, popularGame.first_release_date);
                    const company = findDeveloper(popularGame.involved_companies);
                    const screenshots = popularGame.screenshots;
                    const summary = popularGame.summary;

                    if (videoID !== null || screenshotID !== null) {
                        popularGamesData.push({
                            game,
                            rating,
                            genres,
                            screenshotID,
                            company,
                            releaseDate,
                            videoID,
                            screenshots,
                            summary,
                            id
                        })
                    }
                })

                dispatch({
                    type: homePageRequestsConstants.SET_POPULAR_GAMES,
                    popularGames: getRandom(popularGamesData, 10)
                })

            })
            .catch(error => console.log("getPopularGames error", error));
    }
}


export const getRecentlyReleasedGames = () => {
    return dispatch => {
        getRecentlyReleasedRequest(30)
            .then(res => res.json())
            .then(res => {
                let games = grabGameData(res);

                dispatch({
                    type: homePageRequestsConstants.SET_RECENTLY_RELEASED_GAMES,
                    games
                })
            })
            .catch(error => console.log("getRecentlyReleasedGames error", error))
    }
}

export const getComingSoonGames = () => {
    return dispatch => {
        getComingSoonGamesRequest(30)
            .then(res => res.json())
            .then(res => {
                let games = grabGameData(res);

                dispatch({
                    type: homePageRequestsConstants.SET_COMING_SOON_GAMES,
                    games
                })
            })
            .catch(error => console.log("getComingSoonGames error", error))
    }
}

//Best rated games : this month/last 6 months/this year/all time/
export const getBestRatedGames = (time) => {
    return dispatch => {
        getBestRatedGamesRequest(time, 10)
            .then(res => res.json())
            .then(res => {
                const bestRatedGamesData = [];
                res.forEach(bestRatedGame => {
                    const id = bestRatedGame.id;
                    const game = bestRatedGame.name;
                    const rating = Math.round(bestRatedGame.aggregated_rating);
                    const genres = bestRatedGame.genres;
                    const screenshots = bestRatedGame.screenshots;
                    const company = findDeveloper(bestRatedGame.involved_companies);
                    const releaseDate = getElapsedTime(bestRatedGame.release_dates, bestRatedGame.first_release_date);
                    const summary = bestRatedGame.summary;

                    bestRatedGamesData.push({
                        game,
                        rating,
                        genres,
                        screenshots,
                        company,
                        releaseDate,
                        summary,
                        id
                    })
                })
                dispatch({
                    type: time,
                    games: bestRatedGamesData
                })
            })
            .catch(error => console.log("getBestRatedGames ", error))
    }
}