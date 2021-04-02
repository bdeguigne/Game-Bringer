const fetch = require('node-fetch')
require('dotenv').config();

const handler = async function (event) {
    try {
        let query = event.queryStringParameters.query;
        let url = event.queryStringParameters.url;
        let token = event.queryStringParameters.token;
        let accessToken = event.queryStringParameters.access_token;
        let type = event.queryStringParameters.type;

        console.log("TOKEN", token);
        console.log("TOKEN", type);

        let response = null;

        if (type === "igdb") {
            if (token) {
                console.log("CLIEND ID", process.env.CLIENT_ID)
                console.log("CLIENT SECRET", process.env.CLIENT_SECRET)
                response = await fetch(`https://id.twitch.tv/oauth2/token?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&grant_type=client_credentials`, {
                    method: "POST"
                })
            } else {
                let requestOptions = {
                    method: 'POST',
                    headers: {
                        "Client-ID": process.env.CLIENT_ID,
                        "Authorization": `Bearer ${accessToken}`,
                        "Content-Type": "text/plain"
                    },
                    body: query,
                    redirect: 'follow'
                };

                response = await fetch("https://api.igdb.com/v4" + url, requestOptions);
            }
        } else {
            if (token) {
                console.log("CLIEND ID", process.env.CLIENT_ID)
                console.log("CLIENT SECRET", process.env.CLIENT_SECRET)
                response = await fetch(`https://id.twitch.tv/oauth2/token?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&grant_type=client_credentials`, {
                    method: "POST"
                })
            } else {

                let requestOptions = {
                    method: "GET"
                }
                response = await fetch(url, requestOptions);
            }
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
        return {
            statusCode: 500,
            // Could be a custom message or object i.e. JSON.stringify(err)
            body: JSON.stringify({ msg: error.message }),
        }
    }
}

module.exports = { handler }
