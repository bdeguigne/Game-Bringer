import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components';
import { Carousel } from 'react-responsive-carousel';


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
                    thumb: `https://img.youtube.com/vi/${video.video_id}/default.jpg`
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

        console.log("OKAY SETUP", slideDataTmp);
    }, [props.videos, props.screenshots])

    return (
        <SliderContainer>
            <Carousel
                className="carousel-highlight ocean"
                showStatus={false}
                showArrows={true}
                thumbWidth={115}
            // renderThumbs={() => customRenderThumb(props.screenshots)}
            // showIndicators={false}
            >
                {props.screenshots && props.screenshots.map((screenshot, i) => {
                    return (
                        <img key={i} src={`https://images.igdb.com/igdb/image/upload/t_screenshot_big/${screenshot.image_id}.jpg`} alt="screenshot" />
                    )
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

