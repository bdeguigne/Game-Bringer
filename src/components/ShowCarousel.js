import React, { useState } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import PropTypes from 'prop-types';

import { Carousel } from 'react-responsive-carousel';
import CarouselItem from "./CarouselItem";

import CarouselIndicator from "./CarouselIndicator";
import styled from 'styled-components';

const Container = styled.div`
    position: relative;
    width: 100%;
`;

const IndicatorContainer = styled.div`
    text-align: center;
`;

function ShowCarousel({ data, loadingStatus }) {
    const [currentSlide, setCurrentSlide] = useState(0);

    const updateCurrentSlide = (index) => {
        if (currentSlide !== index) {
            setCurrentSlide(index);
        }
    }

    return (
        <Container>
            <Carousel
                centerMode
                infiniteLoop
                showThumbs={false}
                interval={5000}
                // autoPlay={data.length === 10}
                autoPlay={false}
                onChange={updateCurrentSlide}
                centerSlidePercentage={40}
                onClickItem={updateCurrentSlide}
                showStatus={false}
                showArrows={false}
                showIndicators={false}
                selectedItem={currentSlide}
            >
                {data.length === 10 ? data.map((element, i) => {
                    return <CarouselItem
                        key={i}
                        isSelected={currentSlide === i ? true : false}
                        imageId={element.screenshotID}
                        title={element.game}
                        genres={element.genres}
                        rate={element.rating}
                        company={element.company}
                        videoId={element.videoID}
                        isLoading={false}
                        releaseDate={element.releaseDate}
                        screenshots={element.screenshots}
                        summary={element.summary}
                    />
                }) : (
                        Array.from({ length: 10 }, (item, index) => {
                            return <CarouselItem
                                key={index}
                                isSelected={currentSlide === index ? true : false}
                                isLoading={true}
                            />
                        }
                        )
                    )
                }
            </Carousel>
            <IndicatorContainer>
                <CarouselIndicator
                    itemCount={data.length}
                    onClick={(index) => updateCurrentSlide(index)}
                    selectedIndex={currentSlide}
                    setSelectedIndex={updateCurrentSlide}
                    loadingStatus={data.length === 10 ? null : loadingStatus}
                />
            </IndicatorContainer>
        </Container>
    );
}

ShowCarousel.prototype = {
    games: PropTypes.array.isRequired
}

export default ShowCarousel;