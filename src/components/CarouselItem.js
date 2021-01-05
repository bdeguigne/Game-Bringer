import React, { useState } from 'react'
import { Button } from "@material-ui/core";

import PropTypes from 'prop-types';
import CircularProgressWithLabel from "./CircularProgressWithLabel";
import Skeleton from '@material-ui/lab/Skeleton';
import styled from 'styled-components';
import { SkeletonColor } from '../utils/styles';
import VideoPlayer from "./VideoPlayer";
import { appColors, carousel } from "../utils/styles";
import Shine from "./Shine";

const borderRadius = "16px";

const Slide = styled.div`
  height: 363px !important;
  position: relative;
  cursor: pointer;
  transition: all 500ms ease;
  margin-left: ${props => props.isSelected ? '-100px !important' : "0px"};
  margin-right: ${props => props.isSelected ? '-100px !important' : '0px'};
  border-radius: ${borderRadius};
  transform: ${props => props.isSelected ? "scale(1, 1)" : "scale(0.7, 0.7)"};
  box-shadow: ${props => props.isSelected ? (props.videoReady ? carousel.selectedBoxShadow : carousel.hoveredNeonBoxShadow) : carousel.boxShadow}
  //border: ${carousel.border};
  overflow: hidden;
`

const Image = styled.img`
  position: absolute;
  left: 0;
  top: 0;
  height: 357.5px !important;
  display: block;
  object-fit: cover;
  border-radius: ${borderRadius};
  transition: all 500ms ease;
  opacity: ${props => props.hide ? 0 : 1};
  filter: ${props => props.isSelected ? "brightness(100%)" : "brightness(20%)"} ${props => props.isHover ? " blur(2px)" : " blur(0px)"};
    /* filter: ${props => props.isHover ? "blur(2px)" : "blur(0px)"}; */
  /* z-index: -10 !important; */
`;

const Legend = styled.div`
  z-index: ${props => props.isSelected ? 1 : 0};
  transform: ${props => props.isSelected ? "scale(1, 1)" : "scale(0, 0)"};
  transition: opacity 800ms ease-in-out;
  position: absolute;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: baseline;
  bottom: 0px;
  opacity: ${props => props.isSelected && !props.hide ? 1 : 0};
  padding: 24px;
  width: 100%;
  height: 100%;
  text-align: left;
  border-radius: ${borderRadius};
  background: linear-gradient( to bottom,rgba(0,0,0,0.2) , rgba(0,0,0,0.4) 80%);
`

const LegendBottom = styled.div`
  margin-top: auto;
`

const FlexContainer = styled.div`
  display: flex;
  margin-bottom: 16px;
  flex-wrap: wrap;
`

const Genre = styled(Button)`
  padding: 16px !important;
  height: 30px !important;
  margin-right: 8px !important;
  margin-bottom: 8px !important;
`

const GameName = styled.h2`
  display: -webkit-box;
  font-size: 2.3em;
  margin-bottom: 8px;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`

const Date = styled.div`
  margin-bottom: 16px;
  color: white;
  display: flex;
`

const SeeMoreButton = styled(Button)`
  margin-top: 32px !important;
`

const Critic = styled.div`
  display: flex;
  transform: scale(1, 1);
  opacity: 1;
  height: 100%;
`

const CompanyName = styled.span`
  margin-right: 4px;
  cursor: pointer;
  
  &:hover {
    text-decoration: underline;
  }
`

const StyledSkeleton = styled(Skeleton)`
  background-color: ${SkeletonColor} !important;
  width: 100% !important;
  height: 357.5px !important;
  //height: 100% !important;
  display: block;
  object-fit: cover;
  border-radius: ${borderRadius};
  transition: all 500ms ease;
  filter: ${props => props.selected ? "brightness(100%)" : "brightness(60%)"};
  z-index: -10 !important;
`

function CarouselItem({ imageId, isSelected, title, genres, rate, isLoading, company, videoId, releaseDate }) {
    const [isHover, setIsHover] = useState(false);
    const [hide, setHide] = useState(false);

    const onSlideHover = () => {
        if (isSelected === true && videoId != null) {
            setIsHover(true);
        }
    }

    const onSlideLeave = () => {
        if (isSelected === true) {
            setIsHover(false);
            setHide(false);
        }
    }


    if (isLoading) {
        return (
            <Slide isSelected={isSelected} onMouseEnter={onSlideHover} onMouseLeave={onSlideLeave} videoReady={!hide}>
                <Shine active={isHover} borderColor={hide ? appColors.shine : appColors.secondaryDarker}>
                    <StyledSkeleton selected={isSelected} variant="rect" animation="wave" />
                </Shine>
            </Slide>
        )
    }
    else {
        return (
            <Slide isSelected={isSelected} onMouseEnter={onSlideHover} onMouseLeave={onSlideLeave} videoReady={!hide}>
                <Shine active={isHover && !hide} borderColor={hide ? appColors.shine : appColors.secondaryDarker} >
                    <div style={{ position: "relative", borderRadius: "45px !important" }}>
                        {isHover && (
                            <VideoPlayer className="carousel-video-player" videoID={videoId} onReady={() => setHide(true)} playtime="15" />
                        )}
                            <Image isSelected={isSelected} isHover={isHover} hide={hide} alt="slider" src={"https://images.igdb.com/igdb/image/upload/t_screenshot_huge/" + imageId + ".jpg"} />
                    </div>
                </Shine>


                <Legend isSelected={isSelected} hide={hide}>
                    <LegendBottom>
                        <div>
                            <GameName>{title}</GameName>
                            <Date>
                                {company && (
                                    <CompanyName>{company.name}</CompanyName>
                                )}
                                <span style={{color: "#e0e0e0"}}>{releaseDate.elapsedTime ? " - " + releaseDate.elapsedTime : " - " + releaseDate.date}</span>
                                {/*{releaseDate.date} {releaseDate.elapsedTime !== undefined && (`(${releaseDate.elapsedTime})`)}*/}
                            </Date>
                        </div>
                        {genres &&
                        <FlexContainer>
                            {genres.map((genre, index) => {
                                if (index < 3) {
                                    return <Genre key={index} size="small" color="secondary">{genre.name}</Genre>
                                }
                                return null
                            })}

                        </FlexContainer>
                        }
                        <SeeMoreButton color="primary" className="carousel__item__legend__seemoreButton">See more</SeeMoreButton>
                    </LegendBottom>
                    {!isNaN(rate) &&
                    <Critic>
                        <LegendBottom>
                            <div>
                                <CircularProgressWithLabel value={rate} />
                            </div>
                        </LegendBottom>
                    </Critic>
                    }
                </Legend>

            </Slide>
        )
    }
}

CarouselItem.prototype = {
    imageId: PropTypes.string,
    isSelected: PropTypes.bool,
    title: PropTypes.string,
    category: PropTypes.string,
    rate: PropTypes.number
}

export default CarouselItem;