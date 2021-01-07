const fetch = require('node-fetch')

const handler = async function (event) {
    try {
        let query = event.queryStringParameters.query;
        let url = event.queryStringParameters.url;

        let requestOptions = {
            method: 'POST',
            headers: {
                "Client-ID": "e31044r4d7oqge4odpsqg7xeet90oz",
                "Authorization": "Bearer i7vmph6ootlnq25jw6t8whrzoh38pq",
                "Content-Type": "text/plain"
            },
            body: query,
            redirect: 'follow'
        };

        const response = await fetch("https://api.igdb.com/v4" + url, requestOptions);

        if (!response.ok) {
            // NOT res.status >= 200 && res.status < 300
            return { statusCode: response.status, body: response.statusText }
        }
        const data = await response.json()

        return {
            statusCode: 200,
            body: JSON.stringify(data)
        }
    } catch (error) {
        // output to netlify function log
        console.log("IN NODE FETCH", error)
        return {
            statusCode: 500,
            // Could be a custom message or object i.e. JSON.stringify(err)
            body: JSON.stringify({ msg: error.message }),
        }
    }
}

module.exports = { handler }
