import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Center, Link } from '../../utils/styles';
import { Button } from '@material-ui/core';

const Container = styled.div`
    margin-left: 12px;
    width: 100%;
    /* border: 1px solid; */
`

const InfoContainer = styled.div`
    margin-bottom: 16px;
`

const Label = styled.span`
    font-weight: bold;
    text-transform: uppercase;
    font-size: 10px;
    color: #C4C4C4;
`

const Genre = styled(Button)`
  padding: 6px !important;
  height: 24px !important;
  margin-right: 8px !important;
  margin-bottom: 8px !important;
  font-size: 10px !important;
  border-radius: 6px !important;
`

const Separator = styled.hr`
    width: 80%;
    height: 1px;
    background-color: #3C3C3C;
    border: none;
`

function RightContent(props) {
    return (
        <Container>
            {props.game.platforms && (
                <InfoContainer>
                    <p>
                        <Label>Platform{props.game.platforms.length > 1 && "s"} : </Label>
                        {props.game.platforms.map((platform, i) => {
                            return <Link theme={props.theme} href="#">{platform.name}{i !== (props.game.platforms.length - 1) && ", "}</Link>
                        })}
                    </p>
                </InfoContainer>
            )}

            {props.game.developers && (
                <InfoContainer>
                    <p>
                        <Label>Developer : </Label>
                        <Link theme={props.theme} href="#">{props.game.developers.name}</Link>
                    </p>
                </InfoContainer>
            )}

            {props.game.publishers && (
                <InfoContainer>
                    <p>
                        <Label>Publisher : </Label>
                        <Link theme={props.theme} href="#">{props.game.publishers.name}</Link>
                    </p>
                </InfoContainer>
            )}

            {props.game.genres && (
                <InfoContainer>
                    {props.game.genres.map((genre, index) => {
                        return <Genre key={index} size="small" color="secondary">{genre.name}</Genre>
                    })}
                </InfoContainer>
            )}

            <Center>
                <Separator></Separator>
            </Center>
        </Container>
    )
}

RightContent.propTypes = {
    game: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    theme: PropTypes.string
}

export default RightContent

