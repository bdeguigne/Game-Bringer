import { doRequest } from "./request";
import moment from "moment";

export const getRecentGamesService = (limit) => {
    const nowUnix = moment().unix();
    const lastMonthUnix = moment().subtract(1, "months").unix();

    var raw = `fields platform,date,game,human;where date > ${lastMonthUnix} & date < ${nowUnix};sort date desc;limit ${limit};`;
    return doRequest("http://localhost:3000/v4/release_dates/", raw);
}

export const getGameInfoService = (gameID) => {
    var raw = `fields name,genres,cover;where id = ${gameID};`

    return doRequest("http://localhost:3000/v4/games/", raw);
}

export const getCoverService = (coverID) => {
    var raw = `fields image_id;where id = ${coverID};`

    return doRequest("http://localhost:3000/v4/covers/", raw)
}