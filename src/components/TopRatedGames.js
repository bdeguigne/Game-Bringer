import React from "react";
import { connect } from "react-redux";
import GameShowcase from "./GameShowcase";

import styled from "styled-components";

const Container = styled.div`
  margin-top: 16px;
  margin-bottom: 16px;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`

const Title = styled.h3`
  margin-top: 32px;
  margin-bottom: 48px;
`;


function TopRatedGames({games}) {
    return (
        <Container>
            <Header>
                <Title>
                    Top Rated Games
                </Title>
            </Header>
            {games.length > 0 && (
                <GameShowcase data={games[9]} />
            )}
        </Container>
    );
}

function mapStateToProps(state) {
    return {
        games: state.homePageRequests.bestRatedGamesThisMonth
    }
}

const connectedTopRatedGames = connect(mapStateToProps)(TopRatedGames);

export default connectedTopRatedGames;