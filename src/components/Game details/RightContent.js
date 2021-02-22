import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { appColors, Center } from '../../utils/styles'
import CircularProgressWithLabel from '../CircularProgressWithLabel';

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

function RightContent(props) {
    return (
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
    )
}

RightContent.propTypes = {
    game: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    theme: PropTypes.string
}

export default RightContent

