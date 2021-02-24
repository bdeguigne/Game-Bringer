import { doRequest } from "./request"

export const getGameDetailsRequest = (id) => {
    const query = `fields *, genres.*, websites.*, screenshots.image_id, videos.video_id, cover.image_id, release_dates.human, release_dates.date, release_dates.category, release_dates.platform.name, involved_companies.company.name,involved_companies.company.logo, involved_companies.developer, involved_companies.publisher, platforms.name, game_modes.name, themes.name, player_perspectives.name, game_engines.name;
                    where id = ${id};
                    limit 1;`

    return doRequest("/games", query);
}