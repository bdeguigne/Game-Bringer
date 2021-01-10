import './App.css';
import "./global.css";
import React, { useEffect } from "react";
import HomePage from './components/HomePage';
import TopBar from "./components/TopBar";
import styled from 'styled-components';
import { maxWidth } from './utils/styles';
// REDUX
import { connect } from "react-redux";
import { getPopularGames, getRecentlyReleasedGames, getComingSoonGames, getBestRatedGames } from './redux/actions/homePageRequestsActions';
import {bestRatedGames} from "./redux/constants/homePageRequestsConstants"


const MainContent = styled.div `
  margin: 0 auto;
  width: ${maxWidth};
  max-width: 100%;
`

function App(props) {

    useEffect(() => {
        props.getPopularGames();
        props.getRecentlyReleasedGames();
        props.getComingSoonGames();
        props.getBestRatedGames(bestRatedGames.THIS_MONTH);
    }, [props])

    return (
        <div className="app">
            <div>
                <TopBar />
                <MainContent>
                    <HomePage />
                </MainContent>
            </div>
        </div>
    );
}

const actionCreators = {
    getPopularGames,
    getRecentlyReleasedGames,
    getComingSoonGames,
    getBestRatedGames
}

function mapStateToProps() {
    return {}
}

const connectedApp = connect(mapStateToProps, actionCreators)(App);

export default connectedApp;
