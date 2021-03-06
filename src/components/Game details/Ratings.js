import React from 'react'
import PropTypes from 'prop-types'
import { appColors, Center, isEmpty, Link } from '../../utils/styles';
import styled from 'styled-components';
import CircularProgressWithLabel from '../CircularProgressWithLabel';
import { Skeleton } from '@material-ui/lab';

const BottomRightContainer = styled.div`
    display: flex;
    align-items: flex-end;
`

const AbsoluteBottomRightContainer = styled.div`
    display:  ${props => props.mobile ? "block" : "none"};
    position: ${props => props.mobile ? "initial" : "absolute"};
    bottom: -30px;
    right: 0;
    margin-bottom: 16px;

    @media only screen and (min-width: 768px) {
        display: ${props => props.mobile ? "none" : "block"};
        position: absolute;
    }
`

const RatingWrapper = styled.div`
    display: flex;
    background-color: ${props => appColors[props.theme].backgroundContrast};
    border-radius: 100%;
    padding: ${props => props.loading === "true" ? 0 : "10px"};
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
        <AbsoluteBottomRightContainer mobile={props.mobile}>
            <BottomRightContainer>
                <AlignCenterContainer>
                    <CircularRatingWrapper>
                        <RatingWrapper theme={props.theme} loading={isEmpty(props.game).toString()} >
                            {!isEmpty(props.game) ? !isNaN(props.game.userRating?.rate) ? (
                                <CircularProgressWithLabel size={130} value={props.game.userRating.rate} fontSize={"1.75rem"} />
                            ) : (
                                <CircularProgressWithLabel size={130} fontSize={"1.75rem"} />
                            ) : (
                                <Skeleton variant="circle" animation="wave" width={130} height={130} />
                            )}
                        </RatingWrapper>
                    </CircularRatingWrapper>
                </AlignCenterContainer>
                <AlignCenterContainer>
                    <CircularRatingWrapper>
                        <RatingWrapper theme={props.theme} style={{ marginLeft: "-3px" }} loading={isEmpty(props.game).toString()}>
                            {!isEmpty(props.game) ? !isNaN(props.game.aggregated_rating?.rate) ? (
                                <CircularProgressWithLabel size={85} value={props.game.aggregated_rating.rate} fontSize={"1.2rem"} />
                            ) : (
                                <CircularProgressWithLabel size={85} fontSize={"1.2rem"} />
                            ) : (
                                <Skeleton variant="circle" animation="wave" width={85} height={85} />
                            )}
                        </RatingWrapper>
                    </CircularRatingWrapper>
                </AlignCenterContainer>
            </BottomRightContainer>
            <Center>
                {!isNaN(props.game.userRating?.rate) ? (
                    <RatingTextContainer>
                        <p>Based on <Link href={props.game.url + "/reviews"} target="_blank" white theme={props.theme}>{props.game.userRating.count} <span style={{ fontWeight: "bold" }}>IGDB member ratings</span></Link></p>
                    </RatingTextContainer>
                ) : !isEmpty(props.game) ? (

                    props.game.releaseDate?.isReleased ? (
                        <RatingTextContainer>
                            <p>Need more ratings</p>
                        </RatingTextContainer>
                    ) : (
                        <RatingTextContainer>
                            <p>Not yet released</p>
                        </RatingTextContainer>
                    )
                ) : (
                    <RatingTextContainer>
                        <Skeleton variant="text" animation="wave" width={120} height={25} />
                    </RatingTextContainer>
                )}
                {!isNaN(props.game.aggregated_rating?.rate) ? (
                    <RatingTextContainer>
                        <p>Based on <Link href={props.game.url + "/reviews"} target="_blank" white theme={props.theme}>{props.game.aggregated_rating.count} <span style={{ fontWeight: "bold" }}>critics ratings</span> </Link></p>
                    </RatingTextContainer>
                ) : !isEmpty(props.game) ? (
                    <RatingTextContainer>
                        <p>Critics score unavailable</p>
                    </RatingTextContainer>
                ) : (
                    <RatingTextContainer>
                        <Skeleton variant="text" animation="wave" width={70} height={25} />
                    </RatingTextContainer>
                )}
            </Center>
        </AbsoluteBottomRightContainer>
    )
}

Ratings.defaultProps = {
    mobile: false
}

Ratings.propTypes = {
    game: PropTypes.oneOfType([
        PropTypes.object, PropTypes.array
    ]),
    theme: PropTypes.string,
    mobile: PropTypes.bool
}

export default Ratings

