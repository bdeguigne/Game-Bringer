
// Required Core Stylesheet
import "@glidejs/glide/dist/css/glide.core.min.css";

// Optional Theme Stylesheet
import "@glidejs/glide/dist/css/glide.theme.min.css";

import './App.css';
import "./global.css";
import { ThemeProvider } from '@material-ui/core/styles';

import React, { useEffect } from "react";
import TopBar from "./components/TopBar";
import { appColors } from './utils/styles';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { routes } from "./routes";
// REDUX
import { connect } from "react-redux";
import { getPopularGames, getRecentlyReleasedGames, getComingSoonGames, getBestRatedGames } from './redux/actions/homePageRequestsActions';
import { getFilters } from './redux/actions/filtersActions';
import { bestRatedGames } from "./redux/constants/homePageRequestsConstants"
import { getTokens } from './redux/services/request'
import { setIsErrorOccurred } from './redux/actions/UIActions'
import { getStores } from './redux/actions/priceActions';
import muiTheme from "./theme";


function App(props) {

    const doRequest = () => {
        props.getPopularGames();
        props.getRecentlyReleasedGames();
        props.getComingSoonGames();
        props.getBestRatedGames(bestRatedGames.THIS_MONTH);
        props.getStores();
        props.getFilters();
    }

    useEffect(() => {
        // document.body.style.backgroundColor = appColors[props.theme].backgroundColor

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

    useEffect(() => {
        document.body.style.backgroundColor = appColors[props.theme].backgroundColor
    }, [props.theme])

    return (
        <ThemeProvider theme={muiTheme(props.theme)}>
            <Router>
                <div className="app">
                    <div>
                        <TopBar />
                        {/* <MainContent> */}
                        <Switch>
                            {routes.map((route, i) => {
                                return (
                                    <Route key={i} path={route.path} render={() => <route.component />} />
                                )
                            }
                            )}
                        </Switch>
                        {/* </MainContent> */}
                    </div>
                </div>
            </Router>
        </ThemeProvider>
    );
}

const actionCreators = {
    getPopularGames,
    getRecentlyReleasedGames,
    getComingSoonGames,
    getBestRatedGames,
    getFilters,
    setIsErrorOccurred,
    getStores
}

function mapStateToProps(state) {
    return {
        theme: state.uiReducer.theme
    }
}

const connectedApp = connect(mapStateToProps, actionCreators)(App);

export default connectedApp;
