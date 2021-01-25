import {doRequest} from './request';

export const getFilterRequest = () => {
    const query = `query genres "Genres" {
        fields name, created_at, slug;
        sort created_at asc;
        limit 500;
    };
    query game_modes "Modes" {
        fields name, updated_at, slug;
        sort updated_at asc;
        limit 500;
    };
    query player_perspectives "Perspectives" {
        fields name, slug;
        limit 500;
    };`

    return doRequest("/multiquery", query);
}

export const searchByNameRequest = (endpoint, searchEntry, exclude) => {
    const excludeString = exclude?.map(elem => `"${elem}"`).join(",");
    const excludeQuery = excludeString ? `& slug != (${excludeString})` : "";

    const query = `fields name,slug;
                    where name ~ *"${searchEntry}"* ${excludeQuery};
                    limit 500;`

    return doRequest(endpoint, query);
}

export const searchRequest = (filterQuery) => {
    const whereCondition = filterQuery ? "where " + filterQuery : "";

    const query = `fields name, platforms, game_modes, genres.slug, platforms.name, platforms.platform_logo.image_id, rating, game_modes.slug, game_engines.slug, involved_companies.developer, involved_companies.company.name, player_perspectives.slug, first_release_date, release_dates.*, cover.image_id, aggregated_rating;
    ${whereCondition} & aggregated_rating > 0;
    sort aggregated_rating desc;
    limit 50;`

    // console.log("QUUUERTT", query);

    return doRequest("/games", query)
}