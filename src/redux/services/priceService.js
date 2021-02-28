import { doRequestCheapshark } from './request';

export const getStoresRequest = () => {
    return doRequestCheapshark("https://www.cheapshark.com/api/1.0/stores");
}

export const getBestPriceRequest = (steamId) => {
    return doRequestCheapshark(`https://www.cheapshark.com/api/1.0/deals?steamAppID=${steamId}&sortBy=Price`);
}