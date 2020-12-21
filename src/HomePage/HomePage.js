import React from "react"
import ShowCarousel from "../components/CarouselOLD/ShowCarouselOLD";
import "./HomePage.css";
import { connect } from "react-redux";

//https://api.igdb.com/

const HomePage = (props) => {

    // useEffect(() => {
    //     console.log("USE EFFECT HOME PAGE" , props.popularGames);
    // }, [props.popularGames])

    return (
        <div className="homepage">
            <div className="homepage__title">
                <h1>Popular games</h1>
            </div>
            {props.popularGames.length === 10 &&
                <ShowCarousel data={props.popularGames} />
            }
        </div>
    )
}

function mapStateToProps(state) {
    return{
        popularGames: state.homePageRequest.popularGames
    }
}

const connectedHomePage = connect(mapStateToProps)(HomePage);

export default connectedHomePage;