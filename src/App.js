import './App.css';
import "./global.css";
import React, { useEffect } from "react";
import HomePage from './components/HomePage/HomePage';
import Topbar from "./components/Topbar/Topbar";

// REDUX
import { connect } from "react-redux";
import { getPopularGames, getRecentlyReleasedGames, getComingSoonGames } from './redux/actions/homePageRequestsActions';
function App(props) {

  useEffect(() => {
    props.getPopularGames();
    props.getRecentlyReleasedGames();
    props.getComingSoonGames();
  }, [props])

  return (
    <div className="app">
      <Topbar />
      <HomePage />
    </div>
  );
}

const actionCreators = {
  getPopularGames,
  getRecentlyReleasedGames,
  getComingSoonGames
}

function mapStateToProps(state) {
  return {}
}

const connectedApp = connect(mapStateToProps, actionCreators)(App);

export default connectedApp;
