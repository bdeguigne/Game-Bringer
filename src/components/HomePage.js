import React from "react"
import ShowCarousel from "./ShowCarousel";
import TopRatedGames from "./TopRatedGames";
import { connect } from "react-redux";
import styled from 'styled-components';
import {Padding} from '../utils/styles';
import OtherGamesSlider from "./OtherGamesSlider";

const TitleContainer = styled(Padding)`
    margin-top: 16px;
    padding-top: 34px;
`;

const HomePage = (props) => {
    return (
        <div>
            <TitleContainer>
                <h2>Popular games right now</h2>
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

            {/*<Padding>*/}
            {/*    <div style={{position: "relative", width: "100%", height: "300px", marginTop: "150px",  border: '1px solid white'}}>*/}
            {/*        <Shine active={true} variant={"fill"} borderColor={appColors.secondaryDarker}>*/}
            {/*            <div>*/}
            {/*                <p>Test</p>*/}
            {/*            </div>*/}
            {/*        </Shine>*/}
            {/*    </div>*/}
            {/*</Padding>*/}
        </div>
    )
}

function mapStateToProps(state) {
    return {
        popularGames: state.homePageRequests.popularGames,
        recentlyReleasedGames: state.homePageRequests.recentlyReleasedGames,
        comingSoonGames: state.homePageRequests.comingSoonGames,
        bestRatedGames: state.homePageRequests.bestRatedGamesThisMonth
    }
}

const connectedHomePage = connect(mapStateToProps)(HomePage);

export default connectedHomePage;