import React, {useState} from "react"
import ShowCarousel from "./ShowCarousel";
import HorizontalSlider from "./HorizontalSlider";
import ImageHoverInfo from "./ImageHoverInfo";
import CardGameInfo from "./CardGameInfo";
import TopRatedGames from "./TopRatedGames";
import { connect } from "react-redux";
import styled from 'styled-components';
import { Padding } from '../utils/styles';

const TitleContainer = styled(Padding)`
    margin-top: 16px;
    padding-top: 34px;
`;

const HomePage = (props) => {
    const [hoveredItem, setHoveredItem] = useState("");

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
                <HorizontalSlider sliderName={"recent"} title="Recently released" isLoading={props.recentlyReleasedGames.length === 0 ? true : false}>
                    {props.recentlyReleasedGames.map((game, i) => {
                        return (
                            <ImageHoverInfo key={i} coverID={game.coverID} gameID={game.game} onMouseLeave={() => setHoveredItem("")} onMouseEnter={(game) => setHoveredItem(game)}>
                                <CardGameInfo title={game.game} genres={game.genres} videoID={game.videoID} isHovered={hoveredItem === game.game ? true : false} />
                            </ImageHoverInfo>
                        )
                    })}
                </HorizontalSlider>
            </Padding>

            <Padding>
                {/* {props.recentlyReleasedIsRequestComplete === true && ( */}
                <HorizontalSlider sliderName={"comingSoon"} title="Coming Soon" isLoading={props.comingSoonGames.length === 0 ? true : false}>
                    {props.comingSoonGames.map((game, i) => {
                        return (
                            <ImageHoverInfo key={i} coverID={game.coverID} gameID={game.game} onMouseLeave={() => setHoveredItem("")} onMouseEnter={(game) => setHoveredItem(game)}>
                                <CardGameInfo title={game.game} genres={game.genres} videoID={game.videoID} isHovered={hoveredItem === game.game ? true : false}/>
                            </ImageHoverInfo>
                        )
                    })}
                </HorizontalSlider>
                {/* )} */}
            </Padding>

        </div>
    )
}

function mapStateToProps(state) {
    return {
        popularGames: state.homePageRequests.popularGames,
        recentlyReleasedGames: state.homePageRequests.recentlyReleasedGames,
        comingSoonGames: state.homePageRequests.comingSoonGames
    }
}

const connectedHomePage = connect(mapStateToProps)(HomePage);

export default connectedHomePage;