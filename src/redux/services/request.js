import { uiConstants } from '../constants/uiConstants';

export const doRequest = (url, query) => {
    //Request to the proxy server made by netflify function (proxy dev and production mode)
    //Proxy configurations located in : /functions/node-fetch/node-fetch.js
    const token = JSON.parse(localStorage.getItem("token"))?.access_token

    return (fetch(`/.netlify/functions/node-fetch?url=${encodeURIComponent(url)}&query=${encodeURIComponent(query)}&access_token=${token}&type=igdb`));
}

export const doRequestCheapshark = (url) => {
    //Request to the proxy server made by netflify function (proxy dev and production mode)
    //Proxy configurations located in : /functions/node-fetch/node-fetch.js

    return (fetch(`/.netlify/functions/node-fetch?url=${encodeURIComponent(url)}&type=cheapshark`));
}

export const getTokens = () => {
    return (fetch(`/.netlify/functions/node-fetch?token=true`));
}

export const handleError = (name, error, dispatch) => {
    if (!error.ok) {
        dispatch({
            type: uiConstants.SET_IS_ERROR_OCCURRED,
            state: true
        })

        if (error.status === 403) {
            getTokens()
                .then(res => res.json())
                .then(res => {
                    localStorage.setItem("token", JSON.stringify(res));
                });
        }
        return true;
    }
    return false;
}