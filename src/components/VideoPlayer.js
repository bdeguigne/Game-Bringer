import React from 'react';
import ReactPlayer from 'react-player/youtube';

function VideoPlayer({ videoID, onReady, className, playtime, volume = 0 }) {

    return (
        <div className={className}>
            <ReactPlayer className={className} url={`https://www.youtube.com/watch?v=${videoID}&t=${playtime}`} playing volume={volume} loop={true} onBufferEnd={onReady} />
        </div>
    )
}

export default VideoPlayer