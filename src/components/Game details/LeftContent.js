import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import GameHighlight from './GameHighlight';

const GameInfoContainer = styled.div`
    margin-top: 64px;
    /* height: px; */
    /* border: 1px solid white; */
    max-width: 865px;
`

function LeftContent(props) {
    return (
        <GameInfoContainer>
            <GameHighlight screenshots={props.game.screenshots} videos={props.game.videos} />
        </GameInfoContainer>
    )
}

LeftContent.propTypes = {
    game: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    theme: PropTypes.string
}

export default LeftContent

