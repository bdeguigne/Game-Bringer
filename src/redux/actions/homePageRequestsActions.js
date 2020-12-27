import { homePageRequestsConstants } from "../constants/homePageRequestsConstants";
import { getPopularGameRequest, getRecentlyReleasedRequest, getComingSoonGamesRequest } from "../services/homePageRequestsServices";

function getVideoTrailer(videos) {
    var videoID = null;

    if (videos && videos.length > 0) {
        var video = videos.find(video => video.name === "Trailer");

        if (!video) {
            //If no trailer, take the first video
            videoID = videos[0].video_id;
        } else {
            videoID = video.video_id;
        }
    }

    return videoID;
}

function getRandom(arr, n) {
    var result = new Array(n),
        len = arr.length,
        taken = new Array(len);
    if (n > len)
        throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
        var x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
}

export const getPopularGames = () => {
    return (dispatch) => {
        getPopularGameRequest()
            .then(res => res.json())
            .then(res => {
                var popularGamesData = [];

                res.forEach(popularGame => {
                    const game = popularGame.name;
                    const rating = Math.round(popularGame.aggregated_rating);
                    const genres = popularGame.genres;
                    const screenshotID = popularGame.screenshots ?  (popularGame.screenshots[Math.floor(Math.random() * popularGame.screenshots.length)]).image_id : null;
                    const videoID = getVideoTrailer(popularGame.videos);

                    var company = null;
                    
                    if (popularGame.involved_companies) {
                        popularGame.involved_companies.forEach(involved_company => {
                            if (involved_company.developer === true) {
                                company = {
                                    name: involved_company.company.name,
                                    logoID: involved_company.company.logo ? involved_company.company.logo.image_id : null
                                }
                            }
                        })
                    }

                    popularGamesData.push({
                        game,
                        rating,
                        genres,
                        screenshotID,
                        company,
                        videoID
                    })
                })

                dispatch({
                    type: homePageRequestsConstants.SET_POPULAR_GAMES,
                    popularGames: getRandom(popularGamesData, 10)
                })

                // console.log("GET POPULAR GAMES RES", data);
            })
            .catch(error => console.log("getPopularGames error", error));
    }
}

export const getRecentlyReleasedGames = () => {
    return dispatch => {
        getRecentlyReleasedRequest(30)
            .then(res => res.json())
            .then(res => {
                // Checking if the game is not already added
                var storedIds = []
                var games = [];

                res.forEach(recentGame => {
                    const gameID = recentGame.game.id;

                    if (!storedIds.includes(gameID)) {
                        const videoID = getVideoTrailer(recentGame.game.videos);
                        const game = recentGame.game.name;
                        const coverID = recentGame.game.cover ? recentGame.game.cover.image_id : null;
                        const genres = recentGame.game.genres;

                        games.push({
                            game,
                            coverID,
                            genres,
                            videoID
                        })
                        storedIds.push(gameID);
                    }
                })
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
                // Checking if the game is not already added
                var storedIds = []
                var games = []

                res.forEach(comingSoonGame => {
                    const gameID = comingSoonGame.game.id;

                    if (!storedIds.includes(gameID)) {
                        const videoID = getVideoTrailer(comingSoonGame.game.videos);
                        const game = comingSoonGame.game.name;
                        const coverID = comingSoonGame.game.cover ? comingSoonGame.game.cover.image_id : null;
                        const genres = comingSoonGame.game.genres;

                        games.push({
                            game,
                            coverID,
                            genres,
                            videoID
                        })
                        storedIds.push(gameID);
                    }
                })

                dispatch({
                    type: homePageRequestsConstants.SET_COMING_SOON_GAMES,
                    games
                })
            })
            .catch(error => console.log("getComingSoonGames error", error))
    }
}