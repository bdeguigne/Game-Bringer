import { doRequest } from "./request"

export const getGameDetailsRequest = (id) => {
    const query = `fields *, genres.*, websites.*, screenshots.image_id, videos.video_id, cover.image_id, release_dates.human, release_dates.date, release_dates.category, release_dates.platform.name, involved_companies.company.name,involved_companies.company.logo, involved_companies.developer, involved_companies.publisher, platforms.name, game_modes.name, themes.name, player_perspectives.name, game_engines.name, similar_games.first_release_date, similar_games.release_dates.human, similar_games.release_dates.date,similar_games.screenshots.image_id, similar_games.release_dates.category,  similar_games.cover.image_id, similar_games.name, similar_games.id, similar_games.genres.name;
                    where id = ${id};
                    limit 1;`

    return doRequest("/games", query);
}