import { doRequest } from "./request";

//TODO RELEASE DATE DE 3 MOIS A PARTIR d'AUJOURDHUI

export const getPopularGame = () => {
    var raw = "fields name, screenshots,aggregated_rating, genres;sort follows desc;where first_release_date > 1600601466 & follows > 10;limit 10;";

    return doRequest("http://localhost:3000/v4/games/", raw);
}

export const getScreenshots = (screenshotID) => {
    var raw = `fields image_id;where id = ${screenshotID};`;

    return doRequest("http://localhost:3000/v4/screenshots", raw);
}

export const storeGenresService = () => {
    var raw = "fields name;limit 500;";

    return doRequest("http://localhost:3000/v4/genres", raw);
}