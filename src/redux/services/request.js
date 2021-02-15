import { uiConstants } from '../constants/uiConstants';

// TODO ENLEVER ACCESS TOKEN EN DUR

// export const doRequest = (url, data) => {
//     var myHeaders = new Headers();
//     myHeaders.append("Client-ID", "e31044r4d7oqge4odpsqg7xeet90oz");
//     myHeaders.append("Authorization", "Bearer i7vmph6ootlnq25jw6t8whrzoh38pq");
//     myHeaders.append("Content-Type", "text/plain");
//     myHeaders.append("Access-Control-Allow-Origin", "*");
//
//     var requestOptions = {
//         method: 'POST',
//         headers: myHeaders,
//         body: data,
//         redirect: 'follow'
//     };
//
//     return (fetch(url, requestOptions))
// }

export const doRequest = (url, query) => {
    //Request to the proxy server made by netflify function (proxy dev and production mode)
    //Proxy configurations located in : /functions/node-fetch/node-fetch.js
    const token = JSON.parse(localStorage.getItem("token"))?.access_token

    return (fetch(`/.netlify/functions/node-fetch?url=${encodeURIComponent(url)}&query=${encodeURIComponent(query)}&access_token=${token}`));
}

export const getTokens = () => {
    return (fetch(`/.netlify/functions/node-fetch?token=true`));
}

export const handleError = (name, error, dispatch) => {
    if (!error.ok) {
        console.log("HANDLE ERR", name, error);
        dispatch({
            type: uiConstants.SET_IS_ERROR_OCCURRED,
            state: true
        })

        if (error.status === 403) {
            console.log("FORBIDDEN");
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