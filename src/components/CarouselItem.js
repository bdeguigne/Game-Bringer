import React, { useState } from 'react'
import { Button, Fade, Tooltip } from "@material-ui/core";
import PropTypes from 'prop-types';
import CircularProgressWithLabel from "./CircularProgressWithLabel";
import Skeleton from '@material-ui/lab/Skeleton';
import styled from 'styled-components';
import VideoPlayer from "./VideoPlayer";
import { appColors } from "../utils/styles";
import Shine from "./Shine";
import FloatingGameDetails from "./FloatingGameDetails";
import { withRouter } from "react-router-dom"
import useWindowDimensions from "../utils/useWindowDimensions";
import { compose } from 'redux';
import { connect } from "react-redux";
import { setLinkFilters } from '../redux/actions/filtersActions'

const borderRadius = "16px";

const Slide = styled.div`
  user-select: none;
  height: 490px !important;
  position: relative;
  cursor: ${props => !props.videoReady ? "pointer" : "default"} ;
  transition: all 500ms ease;
  margin-left: 8px;
  margin-right: 8px;

  border-radius: ${borderRadius};
  transform: none;
  box-shadow: ${props => props.isSelected ? (props.videoReady ?
    "0px 0px 20px 4px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.19)" : props.isDesktop ?
      `0 0 0.5rem ${appColors[props.theme].secondary}, 0 0 2rem -21px ${appColors[props.theme].secondary}, inset 12px -20px 2rem -24px ${appColors[props.theme].secondary}, 0 0 4rem -15px ${appColors[props.theme].secondary}` :
      `0 0 0.5rem ${appColors[props.theme].secondary}, 0 0 2rem -14px ${appColors[props.theme].secondary}, inset 12px -24px 2rem -24px ${appColors[props.theme].secondary}, 0 0 4rem -45px ${appColors[props.theme].secondary}`) :
    `0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.19);`};

  overflow: hidden;

  @media only screen and (min-width: 768px) {
    /* For desktop */
    margin-left: ${props => props.isSelected ? '-100px !important' : "0px"};
    margin-right: ${props => props.isSelected ? '-100px !important' : '0px'};

    height: 363px !important;

    transform: ${props => props.isSelected ? "scale(1, 1)" : "scale(0.7, 0.7)"};
  }
`

const Image = styled.img`
  position: absolute;
  left: 0;
  top: 0;
  height: 483px !important;
  display: none;
  object-fit: cover;
  border-radius: ${borderRadius};
  transition: all 500ms ease;
  opacity: ${props => props.hide ? 0 : 1};
  filter: ${props => props.isSelected ? "brightness(100%)" : "brightness(20%)"} ${props => props.isHover ? " blur(2px)" : " blur(0px)"};
    /* filter: ${props => props.isHover ? "blur(2px)" : "blur(0px)"}; */
  /* z-index: -10 !important; */

  @media only screen and (min-width: 768px) {
    height: 357.5px !important;
  }
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
  bottom: 0;
  opacity: ${props => props.isSelected && !props.hide ? 1 : 0};
  padding: 16px;
  width: 100%;
  height: 100%;
  text-align: left;
  border-radius: ${borderRadius};
  background: linear-gradient( to bottom,rgba(0,0,0,0.2) , rgba(0,0,0,0.4) 80%);

  @media only screen and (min-width: 768px) {
    padding: 24px;
  }
`

const LegendBottom = styled.div`
  margin-top: auto;
  width: 100%;
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
  font-size: 1.5em;
  margin-bottom: 8px;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;

  @media only screen and (min-width: 768px) {
    font-size: 2.3em;
  }
`

const Date = styled.div`
  margin-bottom: 16px;
  color: white;
  display: flex;
`

const ButtonContainer = styled.div`
  margin-top: 32px !important;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`

const SeeMoreButton = styled(Button)`
  width: 100%;

  @media only screen and (min-width: 768px) {
    width: 35% !important;
    min-width: 64px !important;
  }
`

const RateContainer = styled.div`
  margin-left: 16px;
`

const CompanyName = styled.span`
  margin-right: 4px;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`

const StyledSkeleton = styled(Skeleton)`
  background-color: ${props => appColors[props.theme][900]} !important;
  width: 100% !important;
  height: 483px !important;
  
  display: block;
  object-fit: cover;
  border-radius: ${borderRadius};
  transition: all 500ms ease;
  filter: ${props => props.selected ? "brightness(100%)" : "brightness(60%)"};
  z-index: -10 !important;

  @media only screen and (min-width: 768px) {
    height: 357.5px !important;
  }
`

const SkeletonContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  transition: opacity 0.5s;
  opacity: ${props => props.hide ? 0 : 1};
`

const ScreenshotSkeleton = styled(Skeleton)`
  background-color: ${props => appColors[props.theme][900]} !important;
  width: 100% !important;
  height: 100% !important;
  border-radius: 32px;
`

function CarouselItem({ imageId, isSelected, title, genres, rate, isLoading, company, videoId, releaseDate, screenshots, summary, id, onClick, theme, history, setLinkFilters }) {
  const [isHover, setIsHover] = useState(false);
  const [hide, setHide] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const { width } = useWindowDimensions();
  const [imageError, setImageError] = useState(false);

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

  const onClickItem = () => {
    if (isSelected === true) {
      onClick(id, title);
    }
  }

  function genreClick(id, name) {
    setLinkFilters({
      front: { genres: `${id}` },
      chip: { genres: name }
    })

    history.push("/search")
  }

  function companiesClick(id, name) {
    setLinkFilters({
      front: { companies: `${id}` },
      chip: { companies: name }
    })

    history.push("/search")
  }


  if (isLoading) {
    return (
      <Slide isSelected={isSelected} onMouseEnter={onSlideHover} onMouseLeave={onSlideLeave} videoReady={!hide} theme={theme}>
        <Shine active={isHover} borderColor={hide ? appColors[theme].shine : appColors[theme].secondaryDarker} childrenStyle={{ top: "0.75%", left: "0.75%", height: "98.5%", width: "98.5%" }} theme={theme}>
          <StyledSkeleton selected={isSelected} variant="rect" animation="wave" theme={theme} />
        </Shine>
      </Slide>
    )
  }
  else {
    return (
      <Tooltip title={
        <FloatingGameDetails title={title} date={releaseDate.date} elapsedTime={releaseDate.elapsedTime} genres={genres} screenshots={screenshots} summary={summary} theme={theme} />
      } placement={"right"} TransitionComponent={Fade} arrow={true} disableHoverListener={!isSelected} disableTouchListener={true} >

        <Slide onClick={() => hide && onClickItem()} isSelected={isSelected} onMouseEnter={onSlideHover} onMouseLeave={onSlideLeave} videoReady={!hide} theme={theme}>
          <Shine active={isHover && !hide && width >= 768} borderColor={hide ? appColors[theme].shine : appColors[theme].secondaryDarker} childrenStyle={{ top: "0.75%", left: "0.75%", height: "98.5%", width: "98.5%" }} theme={theme}>
            <div style={{ position: "relative", borderRadius: "45px !important" }} >
              {isHover && width >= 768 && (
                <VideoPlayer className="carousel-video-player" videoID={videoId} onReady={() => setHide(true)} playtime="15" />
              )}
              {!imageError && (
                <Image onLoad={() => setImageLoaded(true)} onError={() => setImageError(true)} isSelected={isSelected} isHover={width >= 768 ? isHover : false} hide={imageLoaded ? hide : true} alt="slider" src={"https://images.igdb.com/igdb/image/upload/t_screenshot_huge/" + imageId + ".jpg"} />
              )}

              {imageError && (
                <Image onLoad={() => setImageLoaded(true)} isSelected={isSelected} isHover={width >= 768 ? isHover : false}  hide={imageLoaded ? hide : true} src={process.env.PUBLIC_URL + "/assets/placeholder-cover.png"} alt="placeholder" />
              )}
            </div>
            <SkeletonContainer hide={imageLoaded}>
              <ScreenshotSkeleton variant="rect" animation={imageLoaded ? false : "wave"} style={{ borderRadius: "16px" }} theme={theme} />
            </SkeletonContainer>
          </Shine>


          <Legend isSelected={isSelected} hide={hide}>

            <LegendBottom>
              <div>
                <GameName>{title}</GameName>
                <Date>
                  {company && (
                    <CompanyName onClick={() => companiesClick(company.id, company.name)}>{company.name} - </CompanyName>
                  )}
                  <span style={{ color: "#e0e0e0" }}>{releaseDate.elapsedTime ? releaseDate.elapsedTime : releaseDate.date}</span>
                  {/*{releaseDate.date} {releaseDate.elapsedTime !== undefined && (`(${releaseDate.elapsedTime})`)}*/}
                </Date>
              </div>
              {genres &&
                <FlexContainer>
                  {genres.map((genre, index) => {
                    if (index < 3) {
                      return <Genre key={index} size="small" color="secondary" onClick={() => genreClick(genre.id, genre.name)}>{genre.name}</Genre>
                    }
                    return null
                  })}

                </FlexContainer>
              }
              <ButtonContainer>
                <SeeMoreButton color="primary" onClick={onClickItem}>See more</SeeMoreButton>
                {!isNaN(rate) &&
                  <RateContainer>
                    <CircularProgressWithLabel value={rate} />
                  </RateContainer>
                }
              </ButtonContainer>
            </LegendBottom>

          </Legend>

        </Slide>
      </Tooltip>
    )
  }
}

CarouselItem.propTypes = {
  id: PropTypes.number,
  imageId: PropTypes.string,
  isSelected: PropTypes.bool,
  title: PropTypes.string,
  category: PropTypes.string,
  rate: PropTypes.number,
  screenshots: PropTypes.array,
  summary: PropTypes.string,
  theme: PropTypes.string.isRequired
}

const actionCreator = {
  setLinkFilters
}

function mapStateToProps(state) {
  return {
  }
}


export default compose(
  withRouter,
  connect(mapStateToProps, actionCreator)
)(CarouselItem)