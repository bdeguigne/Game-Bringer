import { doRequest } from "./request";
import moment from "moment";

// Popular Game = follows > 1 || external rating > 1 for the last 3 months
export const getPopularGameRequest = () => {
    // const nowUnix = moment().unix();
    const last3MonthsUnix = moment().subtract(3, "months").unix();

    var query = `fields name, follows, genres.name, involved_companies.developer, involved_companies.company.name, involved_companies.company.logo.image_id, aggregated_rating, screenshots.image_id, videos.video_id, videos.name, rating_count;
                sort follows desc;
                where first_release_date > ${last3MonthsUnix} & (follows > 1 | rating_count > 1);
                limit 100;`

    return doRequest("http://localhost:3000/v4/games/", query);
}

export const getRecentlyReleasedRequest = (limit) => {
    const nowUnix = moment().unix();
    const lastMonthUnix = moment().subtract(1, "months").unix();

    var query = `fields game.name,game.genres.name,game.cover.image_id, date, game.videos.video_id, game.videos.name;
                where date > ${lastMonthUnix} & date < ${nowUnix};
                sort date desc;
                limit ${limit};`;

    return doRequest("http://localhost:3000/v4/release_dates/", query);
}

export const getComingSoonGamesRequest = (limit) => {
    const nowUnix = moment().unix();

    var query = `fields human, date, game.name, game.cover.image_id, game.genres.name, game.videos.video_id, game.videos.name;
                sort date asc;
                where date > ${nowUnix} & category = 0;
                limit ${limit};`;

    return doRequest("http://localhost:3000/v4/release_dates/", query);
}