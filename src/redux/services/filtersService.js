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

export const searchByNameRequest = (endpoint, searchEntry) => {
    const query = `fields name,slug;
                    where name ~ *"${searchEntry}"*;
                    limit 500;`

    return doRequest(endpoint, query);
}