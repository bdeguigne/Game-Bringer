import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components';
import { Carousel } from 'react-responsive-carousel';
import VideoPlayer from '../VideoPlayer';
import YoutubeThumbnail from './YoutubeThumbnail';
import { Dialog } from '@material-ui/core';
import FullscreenSlider from './FullscreenSlider';

const SliderContainer = styled.div`
  /* max-width: 700px; */

  /* position: relative; */
  border: 1 px solid white;
`

function GameHighlight(props) {
    const [data, setData] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);

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
            return item.type === "img" ? <img src={item.props.src} alt="thumb" /> : <YoutubeThumbnail videoId={item.props.videoID} size={1.5} quality={"default"} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        });

    const handleClick = (key, event) => {
        if (event.type === "img") {
            setOpenModal(true);
        }
        // setCurrentSlide(key);
        console.log("CLICK THUMB", key, event);
    }

    const handleClose = () => {
        setOpenModal(false);
    };

    const updateCurrentSlide = (index) => {
        if (currentSlide !== index) {
            setCurrentSlide(index);
        }
    };
    return (
        <SliderContainer
           
        >
            <Carousel
                className="carousel-highlight"
                showStatus={false}
                showArrows={true}
                thumbHeight={68}
                thumbWidth={115}
                renderThumbs={(children) => customRenderThumb(children)}
                onClickItem={handleClick}
                onChange={updateCurrentSlide}

                dynamicHeight
            // showIndicators={false}
            >
                {data && data.map((element, i) => {
                    return element.type === "video" ? <VideoPlayer key={i} videoID={element.id} className="highlight-video" volume={0} playing={i === currentSlide} /> : <img key={element.id} src={element.thumb} alt="screenshot" />
                })}
            </Carousel>
            <Dialog
                open={openModal}
                onClose={handleClose}
            >
                <FullscreenSlider data={data} currentSlide={currentSlide} />
            </Dialog>
        </SliderContainer>
    )
}

GameHighlight.propTypes = {
    screenshots: PropTypes.array,
    videos: PropTypes.array
}

export default GameHighlight

