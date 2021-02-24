import React from 'react'
import PropTypes from 'prop-types'
import { appColors, Center } from '../../utils/styles';
import styled from 'styled-components';
import CircularProgressWithLabel from '../CircularProgressWithLabel';

const BottomRightContainer = styled.div`
    display: flex;
    align-items: flex-end;
`

const AbsoluteBottomRightContainer = styled.div`
    position: absolute;
    bottom: -30px;
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
    display: flex;
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

function Ratings(props) {
    return (
        <AbsoluteBottomRightContainer>
            <BottomRightContainer>
                <AlignCenterContainer>
                    <CircularRatingWrapper>
                        <RatingWrapper theme={props.theme} >
                            {!isNaN(props.game.userRating?.rate) ? (
                                <CircularProgressWithLabel size={130} value={props.game.userRating.rate} fontSize={"1.75rem"} />
                            ) : (
                                <CircularProgressWithLabel size={130} fontSize={"1.75rem"} />
                            )}
                        </RatingWrapper>
                    </CircularRatingWrapper>
                </AlignCenterContainer>
                <AlignCenterContainer>
                    <CircularRatingWrapper>
                        <RatingWrapper theme={props.theme} style={{ marginLeft: "-3px" }}>
                            {!isNaN(props.game.aggregated_rating?.rate) ? (
                                <CircularProgressWithLabel size={85} value={props.game.aggregated_rating.rate} fontSize={"1.2rem"} />
                            ) : (
                                <CircularProgressWithLabel size={85} fontSize={"1.2rem"} />
                            )}
                        </RatingWrapper>
                    </CircularRatingWrapper>
                </AlignCenterContainer>
            </BottomRightContainer>
            <Center>
                {!isNaN(props.game.userRating?.rate) ? (
                    <RatingTextContainer>
                        <p>Based on {props.game.userRating.count} <span style={{ fontWeight: "bold" }}>IGDB member ratings</span></p>
                    </RatingTextContainer>
                ) : (
                    <RatingTextContainer>
                        <p>Need more ratings</p>
                    </RatingTextContainer>
                )}
                {!isNaN(props.game.aggregated_rating?.rate) ? (
                    <RatingTextContainer>
                        <p>Based on {props.game.aggregated_rating.count} <span style={{ fontWeight: "bold" }}>critics ratings</span> </p>
                    </RatingTextContainer>
                ) : (
                    <RatingTextContainer>
                        <p>Critics score unavailable</p>
                    </RatingTextContainer>
                )}
            </Center>
        </AbsoluteBottomRightContainer>
    )
}

Ratings.propTypes = {
    game: PropTypes.oneOfType([
        PropTypes.object, PropTypes.array
    ]),
    theme: PropTypes.string
}

export default Ratings

