import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from "react-router-dom";
import { getGameDetails } from '../../redux/actions/gameDetailsActions';
import { appColors, Center, MainContent, Padding } from '../../utils/styles'
import styled from 'styled-components';
import CircularProgressWithLabel from '../CircularProgressWithLabel';

const Banner = styled.img`
    position: absolute;
    top: 0;
    left: 0;
    height: 442px;
    width: 100%;
    object-fit: cover;
    filter: blur(8px);
    user-select: none;
    z-index: -1;
`

const Container = styled.div`
    position: relative;
`

const Content = styled.div`
    padding-top: 442px;
    height: 108px;
`

const Header = styled.div`
    top: -248px;
    position: relative;
    display: flex;
`

const CoverImg = styled.img`
    margin-right: 16px;
    border-radius: 8px;
    box-shadow: ${props => `0px 0px 64px -3px ${appColors[props.theme].secondaryTransparent}, inset 0px 0px 41px 5px rgba(255, 255, 255, 0.4)`};
    filter: drop-shadow(0px 0px 4px #FFFFFF);
    border: 1.5px solid #FFFFFF;
`

const GameTitleContainer = styled.div`
    width: 100%;
    height: 258px;
    position: relative;
`

const GameTitle = styled.h1`
    font-size: 40px;
    font-weight: bold;
    text-shadow: 0 1px 1px rgb(0 0 0 / 40%);
`

const DateHeading = styled.h2`
    margin-top: 16px;
    font-size: 25px;
    color: #E7E7E7;
    margin-right: 8px;
    text-shadow: 0 1px 1px rgb(0 0 0 / 40%);
`

const DateContainer = styled.div`
    display: flex;
    font-weight: 600;
`

const CompanyHeading = styled.h3`
    margin-top: 16px;
    font-size: 25px;
    font-style: italic;
    font-weight: normal;
    text-shadow: 0 1px 1px rgb(0 0 0 / 40%);
`

const Flex = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
`

const TitleWrapper = styled.div`

    position: absolute;
    bottom: 0px;
    z-index: 2;
    width: 100%;
    min-height: 210px;
`

const FullWidth = styled.div`
    width: 100%;
    
`

const GameInfoContainer = styled.div`
    margin-top: 64px;
    height: 200px;
    border: 1px solid white;
    width: 100%;
`

const RatingsContainer = styled.div`
    position: relative;
    top: -190px;
    width: 300px;
    display: flex;
    align-items: center;
    height: fit-content;
`

const RatingWrapper = styled.div`
    background-color: ${props => appColors[props.theme].backgroundContrast};
    border-radius: 100%;
    padding: 12px;
    height: fit-content;
`

const CircularRatingWrapper = styled.div`
    height: 175px;
    display:flex;
    align-items: center;
`

const RatingTextContainer = styled.div`
    margin-top: 16px;
    text-align: center;
    width: 90%;
    font-size: 13px;
`

const GameDetails = (props) => {
    let { id } = useParams();

    useEffect(() => {
        props.getGameDetails(id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Container>
            <MainContent>
                <Padding>
                    <Banner src={"https://images.igdb.com/igdb/image/upload/t_screenshot_big/" + props.game.banner + ".jpg"} alt="banner" />

                    <Content>
                        <Header>
                            {/* <Flex> */}
                            <CoverImg src={"https://images.igdb.com/igdb/image/upload/t_cover_big/" + props.game.coverId + ".jpg"} alt="cover" theme={props.theme} />
                            <FullWidth>
                                <GameTitleContainer>
                                    <TitleWrapper>

                                        <GameTitle>{props.game.name}</GameTitle>
                                        {props.game.releaseDate && (
                                            <DateContainer>
                                                {props.game.releaseDate.date && (
                                                    <DateHeading>{props.game.releaseDate.date}</DateHeading>
                                                )}
                                                {props.game.releaseDate.elapsedTime && (
                                                    <DateHeading>({props.game.releaseDate.elapsedTime})</DateHeading>
                                                )}
                                            </DateContainer>
                                        )}
                                        {props.game.company?.name && (
                                            <CompanyHeading>{props.game.company.name}</CompanyHeading>
                                        )}
                                    </TitleWrapper>
                                </GameTitleContainer>


                            </FullWidth>
                            {/* </Flex> */}
                        </Header>
                    </Content>
                    <Flex>
                        <GameInfoContainer>
                            <p>Game info</p>
                        </GameInfoContainer>
                        <RatingsContainer>
                            {!isNaN(props.game.userRating?.rate) && (
                                <div>
                                    <CircularRatingWrapper>
                                        <RatingWrapper theme={props.theme} >
                                            <CircularProgressWithLabel size={143} value={props.game.userRating.rate} fontSize={"1.75rem"} />
                                        </RatingWrapper>
                                    </CircularRatingWrapper>
                                    <Center >
                                        <RatingTextContainer>
                                            <p>Based on {props.game.userRating.count} <span style={{ fontWeight: "bold" }}>IGDB member ratings</span></p>
                                        </RatingTextContainer>
                                    </Center>
                                </div>
                            )}
                            {!isNaN(props.game.aggregated_rating?.rate) && (
                                <div>
                                    <CircularRatingWrapper>
                                        <RatingWrapper theme={props.theme} style={{ marginLeft: "-12px" }}>
                                            <CircularProgressWithLabel size={115} value={props.game.aggregated_rating.rate} fontSize={"1.75rem"} />
                                        </RatingWrapper>
                                    </CircularRatingWrapper>
                                    <Center style={{ marginLeft: "-12px" }}>
                                        <RatingTextContainer>
                                            <p>Based on {props.game.aggregated_rating.count} <span style={{ fontWeight: "bold" }}>critics ratings</span> </p>
                                        </RatingTextContainer>
                                    </Center>
                                </div>
                            )}
                        </RatingsContainer>
                    </Flex>
                    {/* <p>test</p> */}
                </Padding>
            </MainContent>
        </Container>
    );
}

const actionCreators = {
    getGameDetails
}

function mapStateToProps(state) {
    return {
        game: state.gameDetailsReducer.game,
        theme: state.uiReducer.theme
    };
}

export default connect(
    mapStateToProps, actionCreators
)(GameDetails);
