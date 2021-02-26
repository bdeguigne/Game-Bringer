import React from 'react'
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { isEmpty } from '../../utils/styles';
import { Skeleton } from '@material-ui/lab';

const GameTitleContainer = styled.div`
    display: ${props => props.mobile ? "block" : "none"};
    width: 100%;
    height: fit-content;
    position: relative;
    margin-bottom: 16px;

    @media only screen and (min-width: 576px) {
        display: ${props => props.mobile ? "none" : "flex"};
        /* position: absolute; */
        height: 258px;
    }
`

const Title = styled.h1`
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

    position: initial;
    bottom: 0px;
    z-index: 2;
    width: 100%;
    min-height: 0;


    @media only screen and (min-width: 576px) {
        position: absolute;
        min-height: 210px;
    }
`

function GameTitle(props) {
    return (
        <GameTitleContainer mobile={props.mobile}>
            <TitleWrapper>
                {isEmpty(props.game) ? (
                    <>
                        <Skeleton variant="text" width={250} height={80} animation="wave" />
                        <DateContainer>
                            <DateHeading>
                                <Skeleton variant="text" width={100} animation="wave" />
                            </DateHeading>
                            <DateHeading>

                                <Skeleton variant="text" width={110} animation="wave" />
                            </DateHeading>
                        </DateContainer>

                        <CompanyHeading>
                            <Skeleton variant="text" width={170} animation="wave" />
                        </CompanyHeading>
                    </>
                ) : (
                    <Title>{props.game.name}</Title>
                )}
                {props.game?.releaseDate && (
                    <DateContainer>
                        {props.game.releaseDate.date && (
                            <DateHeading>{props.game.releaseDate.date}</DateHeading>
                        )}
                        {props.game.releaseDate.elapsedTime && (
                            <DateHeading>({props.game.releaseDate.elapsedTime})</DateHeading>
                        )}
                    </DateContainer>
                )}
                {props.game?.company?.name && (
                    <CompanyHeading>{props.game.company.name}</CompanyHeading>
                )}
            </TitleWrapper>
        </GameTitleContainer>
    )
}

GameTitle.defaultProps = {
    mobile: false
}


GameTitle.propTypes = {
    game: PropTypes.oneOfType([
        PropTypes.object, PropTypes.array
    ]),
    mobile: PropTypes.bool,
}

export default GameTitle;

