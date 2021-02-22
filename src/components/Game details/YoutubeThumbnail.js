import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

const Relative = styled.div`
    position: relative;
    width: fit-content;
    height: fit-content;
`

const Absolute = styled.div`
    left: ${props => `calc(50% - ${props.width}px / 2)`};
    top: ${props => `calc(50% - ${props.height}px / 2)`};
    position: absolute;
`

const PlayerLogoContainer = styled.div`
    width: ${props => props.width + "px"};
    height: ${props => props.height + "px"};
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
`

const Logo = styled(PlayArrowIcon)`
    width: ${props => props.size + "rem"} !important;
    height: ${props => props.size + "rem"} !important;
`

function YoutubeThumbnail(props) {
    return (
        <Relative  style={props.style}>
            <img src={`https://img.youtube.com/vi/${props.videoId}/${props.quality}.jpg`} alt="" style={props.style} />
            <Absolute width={30 * props.size} height={20 * props.size}>
                <PlayerLogoContainer width={30 * props.size} height={20 * props.size}>
                    <Logo size={props.size} />
                </PlayerLogoContainer>
            </Absolute>
        </Relative>
    )
}

YoutubeThumbnail.propTypes = {
    videoId: PropTypes.string,
    size: PropTypes.number,
    quality: PropTypes.string,
    style: PropTypes.object
}

export default YoutubeThumbnail

