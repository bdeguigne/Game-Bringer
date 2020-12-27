import { getPopularGame, getScreenshots, storeGenresService } from "../services/CarouselRequestsServices"

const { CarouselRequestsConstants } = require("../constants/CarouselRequestsConstants");

const checkPopularGamesComplete = () => {
    return (dispatch, getState) => {
        var popularGames = getState().CarouselRequests.popularGamesData;
        var genres = getState().CarouselRequests.genres;

        if (popularGames.length === 10 && genres.length > 0) {
            var games = [];
            popularGames.forEach(game => {
                var genreName = genres.find(genre => genre.id === game.genreID).name;

                games.push({
                    game: game.game,
                    rating: game.rating,
                    genre: genreName,
                    imageID: game.imageID
                })
            })

            dispatch({
                type: CarouselRequestsConstants.SET_POPULAR_GAMES,
                popularGames: games
            })

            dispatch({
                type: CarouselRequestsConstants.POPULAR_GAMES_COMPLETE
            })
        }
    }
}

const grabScreenshot = (game, rating, genreID) => {
    return dispatch => {
        var screenShotID = game.screenshots[Math.floor(Math.random() * game.screenshots.length)];
        var gameName = game.name;

        getScreenshots(screenShotID)
            .then(response => response.json())
            .then(result => {
                if (result[0]) {

                    var imageID = result[0].image_id
                    var data = {
                        game: gameName,
                        rating,
                        genreID,
                        imageID
                    }

                    dispatch({
                        type: CarouselRequestsConstants.ADD_POPULAR_GAME_DATA,
                        data
                    })

                    dispatch(checkPopularGamesComplete());
                } else {
                    console.log("grabScreenshot: result empty", game);
                }

            })
            .catch(error => console.log("Error GrabScreenshot", error));
    }
}

// const getCompany = (game) => {
//     return dispatch => {
//         var involved_companies = game.involved_companies;
//         var gameName = game.name;

//         involved_companies.forEach(companyID => {
//             getCompanyService(companyID)
//                 .then(response => response.json())
//                 .then(result => {
//                     if (result.developer === true) {
//                         console.log(result);
//                         return getCompanyName(result.company)
//                             .then(response => response.json())
//                             .then(result => {
//                                 var data = {
//                                     game: gameName,
//                                     company: result.name
//                                 }

//                                 dispatch({
//                                     type: CarouselRequestsConstants.ADD_POPULAR_GAME_COMPANY,
//                                     company: data
//                                 })
//                             })
//                             .catch(error => console.log("Error get company", error))
//                     }
//                 })
//                 .catch(error => console.log("Error getCompany", error))
//         })
//     }
// }

export const storeGenres = () => {
    return (dispatch, getState) => {
        var genres = getState().CarouselRequests.genres;
        if (genres.length === 0) {
            storeGenresService()
                .then(response => response.json())
                .then(result => {
                    dispatch({
                        type: CarouselRequestsConstants.STORE_GENRES,
                        genres: result
                    })
                    dispatch(checkPopularGamesComplete());
                })
                .catch(error => console.log("Error storeGenre", error));
        }
    }
}

export function getPopularGames() {
    return (dispatch, getState) => {
        var isRequestComplete = getState().CarouselRequests.isRequestComplete;

        if (isRequestComplete === false) {
            getPopularGame()
                .then(response => response.json())
                .then(result => {
                    result.forEach(game => {
                        var rating = Math.round(game.aggregated_rating);
                        var genreID = game.genres[0];

                        dispatch(grabScreenshot(game, rating, genreID));
                    })
                })
                .catch((error) => console.log("error getPopularGames", error));
        }
    };
}