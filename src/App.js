import './App.css';
import "./global.css";
import React, { useEffect } from "react";
import HomePage from './HomePage/HomePage';
import Topbar from "./Topbar/Topbar";

// REDUX
import { connect } from "react-redux";
import { getPopularGames, storeGenres } from "./redux/actions/homePageRequestsActions";

function App(props) {

  useEffect(() => {
    props.getPopularGames();
    props.storeGenres();
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
  storeGenres
}

function mapStateToProps(state) {
  return {}
}

const connectedApp = connect(mapStateToProps, actionCreators)(App);

export default connectedApp;
