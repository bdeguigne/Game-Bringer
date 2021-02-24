import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Title = styled.div`
    font-size: 18px;
    font-weight: 500;
    text-transform: uppercase;
`

const Separator = styled.hr`
    margin-top: 4px;
    height: 1px;
    background-color: #454545;
    border: none;
    width: 70px;
`

const AboutContainer = styled.div`
    margin-top: 16px;
    margin-bottom: 16px;
`

const Paragraph = styled.p`
    font-size: 12px;
    white-space: pre-line;
`

function GameDescription(props) {
    return (
        <div>
            {props.game.summary && (
                <>
                    <Title>
                        About this game
                    </Title>
                    <Separator></Separator>
                    <AboutContainer>
                        <Paragraph>{props.game.summary}</Paragraph>
                    </AboutContainer>
                </>
            )}

            {props.game.storyline && (
                <>
                    <Title>
                        Storyline
                    </Title>
                    <Separator></Separator>
                    <AboutContainer>
                        <Paragraph>{props.game.storyline}</Paragraph>
                    </AboutContainer>
                </>
            )}
        </div>
    )
}

GameDescription.propTypes = {
    game: PropTypes.object
}

export default GameDescription

