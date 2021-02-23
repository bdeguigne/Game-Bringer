import { doRequest } from "./request"

export const getGameDetailsRequest = (id) => {
    const query = `fields *, genres.*, websites.*, screenshots.image_id, videos.video_id, cover.image_id, release_dates.human, release_dates.date, release_dates.category, involved_companies.company.name,involved_companies.company.logo, involved_companies.developer, involved_companies.publisher, platforms.name;
                    where id = ${id};
                    limit 1;`

    return doRequest("/games", query);
}