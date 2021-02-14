const fetch = require('node-fetch')
require('dotenv').config();

// VIEUX TOKEN i7vmph6ootlnq25jw6t8whrzoh38pq

const handler = async function (event) {
    try {
        let query = event.queryStringParameters.query;
        let url = event.queryStringParameters.url;
        let token = event.queryStringParameters.token;
        let accessToken = event.queryStringParameters.access_token;

        let response = null;

        if (token) {
            response = await fetch(`https://id.twitch.tv/oauth2/token?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&grant_type=client_credentials`, {
                method: "POST"
            })
            // return {
            //     statusCode: 200,
            //     body: JSON.stringify(process.env.CLIENT_ID)
            // }
        } else {
            let requestOptions = {
                method: 'POST',
                headers: {
                    "Client-ID": "e31044r4d7oqge4odpsqg7xeet90oz",
                    "Authorization": `Bearer ${accessToken}`,
                    "Content-Type": "text/plain"
                },
                body: query,
                redirect: 'follow'
            };

            response = await fetch("https://api.igdb.com/v4" + url, requestOptions);
        }

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
