import { getRecentGamesService, getGameInfoService, getCoverService } from "../services/RecentlyReleasedService";
import { RecentlyReleasedConstants } from "../constants/RecentlyReleasedConstants";


function getGenreName(genreID, genres) {
    var genreName;

    genres.forEach(genre => {
        if (genre.id === genreID) {
            genreName = genre.name;
        }
    })
    return genreName
}

const getCover = (dateUnix, dateHuman, name, genres, coverID, gameId) => {
    return (dispatch, getState) => {
        var totalGames = getState().RecentlyReleased.totalRecentlyReleasedGames;

        getCoverService(coverID)
            .then(response => {
                response.json();
            })
            .then(result => {
                console.log("RESULT = ", result)
                if (result[0]) {
                    var image_id = result[0].image_id;
                    var data = {
                        name,
                        gameId,
                        dateUnix,
                        dateHuman,
                        genres,
                        cover: image_id
                    }

                    dispatch({
                        type: RecentlyReleasedConstants.ADD_RECENT_GAME,
                        data
                    })

                    var games = getState().RecentlyReleased.recentlyReleasedGames;
                    if (totalGames === games.length) {
                        dispatch({
                            type: RecentlyReleasedConstants.RECENTLY_RELEASED_IS_REQUEST
                        })
                    }

                } else {
                    console.log("getCover: result empty", result);
                    // getCover(dateUnix, dateHuman, name, genres, coverID, gameId)
                }
            })
            .catch(error => console.log("getCover ERROR", error, error.body))
    }
}

const getGameInfo = (gameId, dateUnix, dateHuman) => {
    return (dispatch, getState) => {
        getGameInfoService(gameId)
            .then(response => response.json())
            .then(result => {
                // console.log(result);
                if (result[0]) {

                    var genresData = getState().CarouselRequests.genres;

                    var genres = [];
                    var name = result[0].name;
                    var coverID = result[0].cover

                    if (result[0].genres) {
                        result[0].genres.forEach(genreID => {
                            var genre = getGenreName(genreID, genresData);
                            genres.push(genre);
                        })
                    }
                    dispatch(getCover(dateUnix, dateHuman, name, genres, coverID, gameId));
                }
            })
            .catch(error => console.log("getGameInfo ERROR", error))
    }
}

export const getRecentGames = () => {
    return (dispatch, getState) => {
        var isRequestComplete = getState().RecentlyReleased.isRequestComplete;
        if (isRequestComplete === false) {
            getRecentGamesService(20)
                .then(response => response.json())
                .then(result => {
                    var storedIds = [];
                    result.forEach(game => {
                        var gameID = game.game;
                        var dateUnix = game.date;
                        var dateHuman = game.human;

                        if (!storedIds.includes(gameID)) {
                            dispatch(getGameInfo(gameID, dateUnix, dateHuman))
                            storedIds.push(gameID);
                        }
                    })
                    dispatch({
                        type: RecentlyReleasedConstants.RECENTLY_RELEASED_SET_TOTAL_GAMES,
                        total: storedIds.length
                    })
                })
                .catch(error => console.log("RECENT GAMES ERROR", error))
        }
    }
}