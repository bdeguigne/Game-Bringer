import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import GameHighlight from './GameHighlight';
import ComplementaryInfo from './ComplementaryInfo'


const GameInfoContainer = styled.div`
    width: 100%;
    @media only screen and (min-width: 992px) {
        width: 70%;

    }
`

const Flex = styled.div`
    display: flex;
    flex-direction: column-reverse;
    width: 100%;

    
    @media only screen and (min-width: 992px) {
        flex-direction: row;
    }
`

function LeftContent(props) {
    return (
        <Flex>
            <GameInfoContainer>
                <GameHighlight screenshots={props.game.screenshots} videos={props.game.videos} />
            </GameInfoContainer>
            <div>


                <ComplementaryInfo game={props.game} theme={props.theme} />
            </div>
            {/* <p>Test</p> */}
        </Flex>
    )
}

LeftContent.propTypes = {
    game: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    theme: PropTypes.string
}

export default LeftContent

