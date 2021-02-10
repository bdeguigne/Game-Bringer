import React, { useEffect } from "react"
import ShowCarousel from "./ShowCarousel";
import TopRatedGames from "./TopRatedGames";
import { connect } from "react-redux";
import styled from 'styled-components';
import { Padding, SectionTitle } from '../utils/styles';
import OtherGamesSlider from "./OtherGamesSlider";
import { setRouteIndex } from '../redux/actions/UIActions'

const TitleContainer = styled(Padding)`
    margin-top: 16px;
    padding-top: 34px;
    font-size: 21px;
`;

const Title = styled(SectionTitle)`
  margin-bottom: 0;
`

const HomePage = (props) => {
    useEffect(() => {
        console.log("WHAT");
        props.setRouteIndex(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <TitleContainer>
                <Title>Popular games right now</Title>
            </TitleContainer>

            <div>
                <ShowCarousel data={props.popularGames} />
            </div>

            <Padding>
                <TopRatedGames />
            </Padding>

            <Padding>
                <OtherGamesSlider sliderName={"recently-released"} title={"Recently released"} data={props.recentlyReleasedGames} />
            </Padding>

            <Padding>
                <OtherGamesSlider sliderName={"coming-soon"} title={"Coming Soon"} data={props.comingSoonGames} />
            </Padding>
        </div>
    )
}

const actionCreators = {
    setRouteIndex
}

function mapStateToProps(state) {
    return {
        popularGames: state.homePageRequests.popularGames,
        recentlyReleasedGames: state.homePageRequests.recentlyReleasedGames,
        comingSoonGames: state.homePageRequests.comingSoonGames,
        bestRatedGames: state.homePageRequests.bestRatedGamesThisMonth
    }
}

const connectedHomePage = connect(mapStateToProps, actionCreators)(HomePage);

export default connectedHomePage;