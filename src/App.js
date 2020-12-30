import './App.css';
import "./global.css";
import React, { useEffect, useState } from "react";
import HomePage from './components/HomePage/HomePage';
import TopBar from "./components/Topbar/TopBar";
import SideNav from "./components/SideNav/SideNav";
import styled from 'styled-components';
import { sideNavWidth } from './utils/styles';
// REDUX
import { connect } from "react-redux";
import { getPopularGames, getRecentlyReleasedGames, getComingSoonGames } from './redux/actions/homePageRequestsActions';

const Main = styled.div`
    margin-left: ${props => props.expanded ? sideNavWidth.expanded : sideNavWidth.normal};
    transition: margin-left 0.5s;
`

function App(props) {
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    props.getPopularGames();
    props.getRecentlyReleasedGames();
    props.getComingSoonGames();
  }, [props])

  return (
    <div className="app">
      <SideNav onExpand={(state) => setExpanded(state)} />
      <Main expanded={expanded}>
        <TopBar />
        <HomePage />
      </Main>
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
