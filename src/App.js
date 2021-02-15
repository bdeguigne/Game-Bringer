import './App.css';
import "./global.css";
import React, { useEffect } from "react";
import TopBar from "./components/TopBar";
import styled from 'styled-components';
import { maxWidth } from './utils/styles';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { routes } from "./routes";
// REDUX
import { connect } from "react-redux";
import { getPopularGames, getRecentlyReleasedGames, getComingSoonGames, getBestRatedGames } from './redux/actions/homePageRequestsActions';
import { getFilters } from './redux/actions/filtersActions';
import { bestRatedGames } from "./redux/constants/homePageRequestsConstants"
import { getTokens } from './redux/services/request'
import { setIsErrorOccurred } from './redux/actions/UIActions'


const MainContent = styled.div`
  margin: 0 auto;
  width: ${maxWidth};
  max-width: 100%;
`

function App(props) {

    const doRequest = () => {
        props.getPopularGames();
        props.getRecentlyReleasedGames();
        props.getComingSoonGames();
        props.getBestRatedGames(bestRatedGames.THIS_MONTH);
        props.getFilters();
    }

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            doRequest();
        } else {
            getTokens()
                .then(res => {
                    if (!res.ok) {
                        props.setIsErrorOccurred(true);
                        return;
                    }
                    return res.json();
                })
                .then(res => {
                    if (res) {
                        localStorage.setItem("token", JSON.stringify(res));
                        doRequest();
                    }
                });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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
    getFilters,
    setIsErrorOccurred
}

function mapStateToProps() {
    return {}
}

const connectedApp = connect(mapStateToProps, actionCreators)(App);

export default connectedApp;
