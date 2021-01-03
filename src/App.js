import './App.css';
import "./global.css";
import React, { useEffect, useState } from "react";
import HomePage from './components/HomePage';
import TopBar from "./components/TopBar";
import SideNav from "./components/SideNav";
import styled from 'styled-components';
import { sideNavWidth, maxWidth } from './utils/styles';
// REDUX
import { connect } from "react-redux";
import { getPopularGames, getRecentlyReleasedGames, getComingSoonGames, getBestRatedGames } from './redux/actions/homePageRequestsActions';
import {bestRatedGames} from "./redux/constants/homePageRequestsConstants"


const Main = styled.div`
  //margin-left: ${props => props.expanded ? sideNavWidth.expanded : sideNavWidth.normal};
  transition: margin-left 0.5s;
`

const MainContent = styled.div `
  margin: 0px auto;
  width: ${maxWidth};
  max-width: 100%;
`

function App(props) {
    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
        props.getPopularGames();
        props.getRecentlyReleasedGames();
        props.getComingSoonGames();
        props.getBestRatedGames(bestRatedGames.THIS_MONTH);
    }, [props])

    return (
        <div className="app">
            <SideNav onExpand={(state) => setExpanded(state)} />
            <Main expanded={expanded}>
                <TopBar />
                <MainContent>
                    <HomePage />
                </MainContent>
            </Main>
        </div>
    );
}

const actionCreators = {
    getPopularGames,
    getRecentlyReleasedGames,
    getComingSoonGames,
    getBestRatedGames
}

function mapStateToProps(state) {
    return {}
}

const connectedApp = connect(mapStateToProps, actionCreators)(App);

export default connectedApp;
