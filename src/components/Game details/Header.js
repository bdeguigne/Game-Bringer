import React from 'react'
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { appColors, Center } from '../../utils/styles';
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

const Content = styled.div`
    padding-top: 442px;
    height: 108px;
`

const HeaderContainer = styled.div`
    top: -248px;
    position: relative;
    display: flex;
`

const CoverImg = styled.img`
    margin-right: 16px;
    border-radius: 8px;
    box-shadow: ${props => `0px 0px 30px 0px ${appColors[props.theme].secondaryTransparent}, inset 0px 0px 41px 5px rgba(255, 255, 255, 0.4)`};
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

const TitleWrapper = styled.div`

    position: absolute;
    bottom: 0px;
    z-index: 2;
    width: 100%;
    min-height: 210px;
`

const FullWidth = styled.div`
    width: 100%;
    display: flex;
`

const BottomRightContainer = styled.div`
    display: flex;
    align-items: flex-end;
`

const AbsoluteBottomRightContainer = styled.div`
    position: absolute;
    bottom: 0;
    right: 0;
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
    padding: 10px;
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
    width: 134px;
    font-size: 13px;
`

const AlignCenterContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

function Header(props) {
    return (
        <div>
            <Banner src={"https://images.igdb.com/igdb/image/upload/t_screenshot_big/" + props.game.banner + ".jpg"} alt="banner" />

            <Content>
                <HeaderContainer>
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
                        <AbsoluteBottomRightContainer>

                            <BottomRightContainer>
                                {!isNaN(props.game.userRating?.rate) && (
                                    <AlignCenterContainer>
                                        <CircularRatingWrapper>
                                            <RatingWrapper theme={props.theme} >
                                                <CircularProgressWithLabel size={130} value={props.game.userRating.rate} fontSize={"1.75rem"} />
                                            </RatingWrapper>
                                        </CircularRatingWrapper>
                                        {/* <Center >
                                            <RatingTextContainer>
                                                <p>Based on {props.game.userRating.count} <span style={{ fontWeight: "bold" }}>IGDB member ratings</span></p>
                                            </RatingTextContainer>
                                        </Center> */}
                                    </AlignCenterContainer>
                                )}
                                {!isNaN(props.game.aggregated_rating?.rate) && (
                                    <AlignCenterContainer>
                                        <CircularRatingWrapper>
                                            <RatingWrapper theme={props.theme} style={{ marginLeft: "-3px" }}>
                                                <CircularProgressWithLabel size={85} value={props.game.aggregated_rating.rate} fontSize={"1.2rem"} />
                                            </RatingWrapper>
                                        </CircularRatingWrapper>
                                        {/* <Center style={{ marginLeft: "-12px" }}>
                                            <RatingTextContainer>
                                                <p>Based on {props.game.aggregated_rating.count} <span style={{ fontWeight: "bold" }}>critics ratings</span> </p>
                                            </RatingTextContainer>
                                        </Center> */}
                                    </AlignCenterContainer>
                                )}
                            </BottomRightContainer>
                            <Center>
                                {!isNaN(props.game.userRating?.rate) && (
                                    <RatingTextContainer>
                                        <p>Based on {props.game.userRating.count} <span style={{ fontWeight: "bold" }}>IGDB member ratings</span></p>
                                    </RatingTextContainer>
                                )}
                                {!isNaN(props.game.aggregated_rating?.rate) && (
                                    <RatingTextContainer>
                                        <p>Based on {props.game.aggregated_rating.count} <span style={{ fontWeight: "bold" }}>critics ratings</span> </p>
                                    </RatingTextContainer>
                                )}

                            </Center>
                        </AbsoluteBottomRightContainer>
                    </FullWidth>
                    {/* </Flex> */}
                </HeaderContainer>
            </Content>
        </div>
    )
}

Header.propTypes = {
    game: PropTypes.oneOfType([
        PropTypes.object, PropTypes.array
    ]),
    theme: PropTypes.string
}

export default Header

