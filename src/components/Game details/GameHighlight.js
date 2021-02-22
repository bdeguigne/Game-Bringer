import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components';
import { Carousel } from 'react-responsive-carousel';
import VideoPlayer from '../VideoPlayer';
import YoutubeThumbnail from './YoutubeThumbnail';


const SliderContainer = styled.div`
  max-width: 700px;

  /* position: relative; */
  border: 1 px solid white;
`

function GameHighlight(props) {
    const [data, setData] = useState([]);

    useEffect(() => {
        var slideDataTmp = [];

        if (props.videos) {
            props.videos.forEach(video => {
                slideDataTmp.push({
                    type: "video",
                    id: video.video_id,
                    thumb: `https://img.youtube.com/vi/${video.video_id}/sddefault.jpg`
                })
            })
        }
        if (props.screenshots) {
            props.screenshots.forEach(screenshot => {
                slideDataTmp.push({
                    type: "screenshot",
                    id: screenshot.image_id,
                    thumb: `https://images.igdb.com/igdb/image/upload/t_screenshot_big/${screenshot.image_id}.jpg`
                })
            })
        }
        setData(slideDataTmp);
    }, [props.videos, props.screenshots])

    const customRenderThumb = (children) =>
        children.map((item) => {
            return item.type === "img" ? <img src={item.props.src} alt="thumb"/> : <YoutubeThumbnail videoId={item.props.videoID} size={1.5} quality={"default"} style={{width: "100%", height: "100%", objectFit: "cover"}}/>
        });

    return (
        <SliderContainer>
            <Carousel
                className="carousel-highlight ocean"
                showStatus={false}
                showArrows={true}
                thumbHeight={68}
                thumbWidth={115}
                renderThumbs={(children) => customRenderThumb(children)}
            // showIndicators={false}
            >
                {data && data.map((element, i) => {
                    return element.type === "video" ? <VideoPlayer key={i} videoID={element.id} className="highlight-video" volume={100}/> : <img key={i} src={element.thumb} alt="screenshot" />
                })}
            </Carousel>
        </SliderContainer>

    )
}

GameHighlight.propTypes = {
    screenshots: PropTypes.array,
    videos: PropTypes.array
}

export default GameHighlight

