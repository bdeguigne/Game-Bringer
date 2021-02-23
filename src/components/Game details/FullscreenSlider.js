import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import { Carousel } from 'react-responsive-carousel';
import VideoPlayer from '../VideoPlayer';

function FullscreenSlider(props) {
    const [currentSlide, setCurrentSlide] = useState(props.currentSlide);

    useEffect(() => {
        // console.log("CURERNT SLIDE", props.currentSlide)
        setCurrentSlide(props.currentSlide);
    }, [props.currentSlide])

    const updateCurrentSlide = (index) => {
        if (currentSlide !== index) {
            setCurrentSlide(index);
        }
    };

    return (
        <Carousel
            className={"modal-carousel"}
            showStatus={false}
            showArrows={true}
            showThumbs={false}
            selectedItem={props.currentSlide}
            onChange={updateCurrentSlide}
        >
            {props.data.map((item, i) => {
                // return <img alt="" key={i} src={`https://images.igdb.com/igdb/image/upload/t_screenshot_huge/${item.image_id}.jpg`} />
                return item.type === "video" ? <VideoPlayer key={i} videoID={item.id} className="modal-video" volume={100} playing={i === currentSlide} /> : <img key={item.id} src={`https://images.igdb.com/igdb/image/upload/t_screenshot_huge/${item.id}.jpg`} alt="screenshot" />
            })}
        </Carousel>
    )
}

FullscreenSlider.propTypes = {
    data: PropTypes.array,
    currentSlide: PropTypes.number,
    setCurrentSlide: PropTypes.func
}

export default FullscreenSlider

