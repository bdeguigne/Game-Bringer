import React, { useState } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import PropTypes from 'prop-types';
import useWindowDimensions from "../utils/useWindowDimensions";
import { Carousel } from 'react-responsive-carousel';
import CarouselItem from "./CarouselItem";
import CarouselIndicator from "./CarouselIndicator";
import styled from 'styled-components';
import {appColors, ArrowIcon} from "../utils/styles";

import {withRouter} from "react-router-dom"

const Container = styled.div`
    position: relative;
    width: 100%;
`;

const ArrowContainer = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  right: 0;
  padding: 40px 32px;

  @media only screen and (min-width: 768px) {
    display: none;
  }
`

const RoundedArrowIconContainer = styled.div`
  cursor: pointer;
  background: ${appColors["midnight"].backgroundColor};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  padding: 12px 14px;
  align-items: center;
  margin-left: 4px;
`

const WhiteArrowIcon = styled(ArrowIcon)`
  font-size: 1.0rem;
  color: white;
  margin-left: ${props => props.left ? "0" : "4px"};
  margin-right: ${props => props.right ? "0" : "4px"};
`

function ShowCarousel({ data, loadingStatus, history, theme }) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const {width} = useWindowDimensions();

    const updateCurrentSlide = (index) => {
        if (currentSlide !== index) {
            setCurrentSlide(index);
        }
    }

    const onClickItem = (id, title) => {
        let urlTitle = title.split(' ').join('_');
        history.push("/" + id + "/" + urlTitle);
    }

    return (
        <Container>
            <Carousel
                className="main-carousel"
                centerMode
                infiniteLoop
                showThumbs={false}
                interval={5000}
                autoPlay={width >= 768 ? data.length === 10 : false}
                onChange={updateCurrentSlide}
                centerSlidePercentage={width >= 768 ? 40 : 100}
                onClickItem={updateCurrentSlide}
                showStatus={false}
                showArrows={false}
                showIndicators={false}
                emulateTouch={false}
                swipeScrollTolerance={125}
                selectedItem={currentSlide}
            >
                {data.length === 10 ? data.map((element, i) => {
                    return <CarouselItem
                        key={i}
                        id={element.id}
                        isSelected={currentSlide === i}
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
                        onClick={onClickItem}
                        theme={theme}
                    />
                }) : (
                        Array.from({ length: 10 }, (item, index) => {
                            return <CarouselItem
                                key={index}
                                isSelected={currentSlide === index}
                                isLoading={true}
                                theme={theme}
                            />
                        }
                        )
                    )
                }
            </Carousel>
            <ArrowContainer>
                <RoundedArrowIconContainer onClick={() => updateCurrentSlide(currentSlide - 1)}>
                    <WhiteArrowIcon className="icon-arrow-left" left={true} theme={theme}/>
                </RoundedArrowIconContainer>
                <RoundedArrowIconContainer onClick={() => updateCurrentSlide(currentSlide + 1)}>
                    <WhiteArrowIcon className="icon-arrow-right" right={true} theme={theme}/>
                </RoundedArrowIconContainer>
            </ArrowContainer>
                <CarouselIndicator
                    itemCount={data.length}
                    onClick={(index) => updateCurrentSlide(index)}
                    selectedIndex={currentSlide}
                    setSelectedIndex={updateCurrentSlide}
                    loadingStatus={data.length === 10 ? null : loadingStatus}
                    theme={theme}
                />
        </Container>
    );
}

ShowCarousel.prototype = {
    games: PropTypes.array.isRequired,
    theme: PropTypes.string.isRequired
}

export default withRouter(ShowCarousel);