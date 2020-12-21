import React, { useEffect, useState, useCallback } from "react"
import ShowCarousel from "../components/Carousel/ShowCarousel";
import "./HomePage.css";

//https://api.igdb.com/


function HomePage() {
    const [popularGames, setPopularGames] = useState([]);

    async function doRequest(url, data) {
        // const PROXY_URL = 'http://localhost:5000/api/';
        var myHeaders = new Headers();
        myHeaders.append("Client-ID", "e31044r4d7oqge4odpsqg7xeet90oz");
        myHeaders.append("Authorization", "Bearer i7vmph6ootlnq25jw6t8whrzoh38pq");
        myHeaders.append("Content-Type", "text/plain");
        myHeaders.append("Access-Control-Allow-Origin", "*");

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: data,
            redirect: 'follow'
        };

        return (fetch(url, requestOptions))
    }

    const grabScreenshot = useCallback(async (games) => {
        games.forEach(game => {
            var screenshotID = game.screenshots[0];
            var gameName = game.name;
            var raw = `fields image_id;where id = ${screenshotID};`;

            doRequest("http://localhost:3000/v4/screenshots", raw)
                .then(response => response.json())
                .then(result => {
                    var imageID = result[0].image_id
                    // console.log(imageID);
                    var data = {
                        game: gameName,
                        imageID
                    }
                    setPopularGames(array => [...array, data])
                })
                .catch(error => {
                    console.log('error 2', error)
                    error.json().then((body) => {
                        //Here is already the payload from API
                        console.log(body);
                    });
                });

        });
    }, [])

    const getPopularGameData = useCallback(async () => {
        console.log("REQUEST")
        var raw = "fields name, screenshots;sort follows desc;where first_release_date > 1600601466 & follows > 10;limit 10;";
  
        if (popularGames.length < 10) {
            doRequest('http://localhost:3000/v4/games/', raw)
                .then(response => response.json())
                .then(result => {
                    console.log(result);
                    grabScreenshot(result)
                })
                .catch((status, error) => console.log('error 1', status));
        };
    }, [grabScreenshot]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        // if (popularGames.length < 10) {
        getPopularGameData();
        // }
    }, [getPopularGameData])

    useEffect(() => {
        console.log("POPULAR GAMES", popularGames);
    }, [popularGames])

    return (
        <div className="homepage">
            <div className="homepage__title">
                <h1>Popular games</h1>
            </div>
            {popularGames.length === 10 &&
                <ShowCarousel data={popularGames} />
            }
        </div>
    )
}

export default HomePage;