import {doRequest} from "./request";
import moment from "moment";
import {bestRatedGames} from "../constants/homePageRequestsConstants"

// Popular Game = follows > 1 || external rating > 1 for the last 3 months
export const getPopularGameRequest = () => {
    // const nowUnix = moment().unix();
    const last3MonthsUnix = moment().subtract(3, "months").unix();

    let query = `fields name, follows, genres.name, involved_companies.developer, involved_companies.company.name, involved_companies.company.logo.image_id, aggregated_rating, screenshots.image_id, videos.video_id, videos.name, rating_count, first_release_date, release_dates.human, release_dates.date, release_dates.category;
                sort follows desc;
                where first_release_date > ${last3MonthsUnix} & (follows > 1 | rating_count > 1);
                limit 500;`

    return doRequest("http://localhost:3000/v4/games/", query);
}

export const getRecentlyReleasedRequest = (limit) => {
    const nowUnix = moment().unix();
    const lastMonthUnix = moment().subtract(1, "months").unix();

    let query = `fields game.name,game.genres.name,game.cover.image_id, date, game.videos.video_id, game.videos.name;
                where date > ${lastMonthUnix} & date < ${nowUnix};
                sort date desc;
                limit ${limit};`;

    return doRequest("http://localhost:3000/v4/release_dates/", query);
}

export const getComingSoonGamesRequest = (limit) => {
    const nowUnix = moment().unix();

    let query = `fields human, date, game.name, game.cover.image_id, game.genres.name, game.videos.video_id, game.videos.name;
                sort date asc;
                where date > ${nowUnix} & category = 0;
                limit ${limit};`;

    return doRequest("http://localhost:3000/v4/release_dates/", query);
}

//Best rated games : this month/last 6 months/this year/all time/
export const getBestRatedGamesRequest = (time, limit) => {
    let unixDate;
    if (time === bestRatedGames.THIS_MONTH) {
        unixDate = moment().subtract(1, "months").unix();
    } else if (time === bestRatedGames.LAST_6_MONTHS) {
        unixDate = moment().subtract(6, "months").unix();
    } else if (time === bestRatedGames.THIS_YEAR) {
        unixDate = moment().subtract(1, "year").unix();
    } else {
        return false;
    }
    const query = `fields name, follows, aggregated_rating, first_release_date, release_dates.human, release_dates.date, genres.name, involved_companies.developer, involved_companies.company.name, involved_companies.company.logo.image_id, screenshots.image_id, summary, release_dates.category;
                    sort aggregated_rating desc;
                    where first_release_date > ${unixDate} & aggregated_rating != null;
                    limit ${limit};`

    return doRequest("http://localhost:3000/v4/games/", query);

}