import './App.css';
import "./global.css";
import React, { useEffect } from "react";
import TopBar from "./components/TopBar";
import styled from 'styled-components';
import { maxWidth } from './utils/styles';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { routes } from "./routes"
// REDUX
import { connect } from "react-redux";
import { getPopularGames, getRecentlyReleasedGames, getComingSoonGames, getBestRatedGames } from './redux/actions/homePageRequestsActions';
import { getFilters } from './redux/actions/filtersActions';
import { bestRatedGames } from "./redux/constants/homePageRequestsConstants"


const MainContent = styled.div`
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
        props.getFilters();
    }, [props])

    return (
        <Router>
            <div className="app">
                <div>
                    <TopBar />
                    <MainContent>
                        <Switch>
                            {routes.map((route, i) => {
                                return (
                                    <Route key={i} path={route.path} render={() => <route.component />} />
                                )
                            }
                            )}
                        </Switch>
                    </MainContent>
                </div>
            </div>
        </Router>
    );
}

const actionCreators = {
    getPopularGames,
    getRecentlyReleasedGames,
    getComingSoonGames,
    getBestRatedGames,
    getFilters
}

function mapStateToProps() {
    return {}
}

const connectedApp = connect(mapStateToProps, actionCreators)(App);

export default connectedApp;
