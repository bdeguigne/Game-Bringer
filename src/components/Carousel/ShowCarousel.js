import React, { useState, useEffect } from 'react';
import "./Carousel.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import PropTypes from 'prop-types';

import { Carousel } from 'react-responsive-carousel';
import CarouselItem from "../CarouselItem/CarouselItem";

import CarouselIndicator from "../CarouselIndicator/CarouselIndicator";


function ShowCarousel(games) {
    const [currentSlide, setCurrentSlide] = useState(0);

    const updateCurrentSlide = (index) => {
        if (currentSlide !== index) {
            setCurrentSlide(index);
        }
    }

    useEffect(() => {
        console.log("INSIDE CAROUSEL ", games);
    }, [games])

    return (
        <div className="carousel">
            <Carousel
                centerMode
                infiniteLoop
                showThumbs={false}
                autoPlay={false}
                onChange={updateCurrentSlide}
                centerSlidePercentage={40}
                onClickItem={updateCurrentSlide}
                showStatus={false}
                showArrows={true}
                showIndicators={false}
                selectedItem={currentSlide}
            >
                {games.data.map((element, i) => {
                    return <CarouselItem
                        key={i}
                        isSelected={currentSlide === i ? true : false}
                        imageId={element.imageID}
                        title={element.game}
                        category="Role-playing (RPG)"
                        company="CD Projekt Red"
                        companyLogoId="cl2dk"
                        rate={80}
                    />
                })}
            </Carousel>

            <div className="carousel__indicator">
                <CarouselIndicator
                    itemCount={games.data.length}
                    onClick={(index) => updateCurrentSlide(index)}
                    selectedIndex={currentSlide}
                    setSelectedIndex={updateCurrentSlide}
                />
            </div>
        </div>
    );
}

ShowCarousel.prototype = {
    games: PropTypes.array.isRequired
}
export default ShowCarousel;