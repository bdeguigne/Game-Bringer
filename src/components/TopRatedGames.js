import React, {useEffect, useState} from "react";
import { connect } from "react-redux";
import GameShowcase from "./GameShowcase";

import styled from "styled-components";
import Glide from "@glidejs/glide";
import {appColors, gameShowNeonBoxShadow, SectionTitle, ArrowIcon} from "../utils/styles";

const Container = styled.div`
  margin-top: 0;
  margin-bottom: 48px;
  border-radius: 32px;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`

// const Title = styled.h3`
//   margin-top: 32px;
//   margin-bottom: 48px;
// `;

const SliderWrapper = styled.div`
  transition: box-shadow,border 1s;
  z-index: 10;
  border: 2px solid ${props => props.isLoading === false ? "white" : appColors.secondaryDarker};
  border-radius: 32px;
  box-shadow: ${props => props.isLoading === false && gameShowNeonBoxShadow} ;
`

const Slider = styled.div`
  border-radius: 32px;
  overflow: hidden;
  user-select: none;
  //height: 225px;
  //padding-top: 16px;
  width: 100%;
  height: 620px;
  position: relative;

  @media only screen and (min-width: 768px) {
    height: 450px;
  }
`

const Slide = styled.div`
  display: flex;
`

const ArrowsContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 3;
  padding: 16px;
  width: fit-content;
display: flex;
  
  @media only screen and (min-width: 768px) {
    top: initial;
    bottom: 0;
    left: 30%;
    padding: 32px;
  }

`

const RoundedArrowIconContainer = styled.div`
  
  background: ${appColors.backgroundColor};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  padding: 12px 14px;
  align-items: center;
  margin-left: 4px;

  @media only screen and (min-width: 768px) {
    background: none;
    padding: 0 8px;
  }
`

const Icon = styled(ArrowIcon)`
  font-size: 1.0rem;
  color: white;
  margin-left: ${props => props.left ? "0" : "4px"};
  margin-right: ${props => props.right ? "0" : "4px"};

  @media only screen and (min-width: 768px) {
    font-size: 2.5rem;
    color: ${appColors.secondaryDarker};
  }
`

const LoadingContainer = styled.div`
  transition: opacity 0.5s;
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  opacity: ${props => props.hide ? 0 : 1};
  z-index: 3;
`

const sliderConfiguration = {
    type: "carousel",
    startAt: 0,
    animationTimingFunc: "ease-in-out",
    perView: 1,
    focusAt: 0,
}

function TopRatedGames({games}) {

    const [slider] = useState(new Glide(`#topRatedSlider`, sliderConfiguration));
    const [sliderLoaded, setSliderLoaded] = useState(false);
    const [hideSkeleton, setHideSkeleton] = useState(false);
    const [removeSkeleton, setRemoveSkeleton] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (games.length > 0 && sliderLoaded === false) {
            slider.on(['mount.after', 'run'], () => {
                const currentIndex = slider.index;
                setCurrentIndex(currentIndex);
            })

            slider.mount();
            setSliderLoaded(true);
        }
    }, [slider, games, sliderLoaded]);

    useEffect(() => {
        if (hideSkeleton === true) {
            setTimeout(() => {
                setRemoveSkeleton(true);
            }, 500)
        }
    }, [hideSkeleton]);


    return (
        <Container>
            <Header>
                <SectionTitle>
                    Top Rated Games this month
                </SectionTitle>
            </Header>
            <SliderWrapper isLoading={!hideSkeleton}>
                <Slider id="topRatedSlider">
                    <div className="glide__track" data-glide-el="track">
                        <Slide className="glide__slides">
                            {games.length > 0 && games.map((game, index) => {
                                    return (
                                        <GameShowcase showed={currentIndex === index} key={index} data={game} darkerImage={true} isLoading={false} onLoad={() => !hideSkeleton && setHideSkeleton(true)}/>
                                    )
                                }
                            )}
                        </Slide>
                        <ArrowsContainer>
                            <RoundedArrowIconContainer>
                                <Icon onClick={() => slider.go("<")} className="icon-arrow-left" left={true}/>
                            </RoundedArrowIconContainer>
                            <RoundedArrowIconContainer>
                                <Icon onClick={() => slider.go(">")} className="icon-arrow-right" right={true}/>
                            </RoundedArrowIconContainer>
                        </ArrowsContainer>
                    </div>
                    {!removeSkeleton && (
                        <LoadingContainer hide={hideSkeleton}>
                            <GameShowcase isLoading={true}/>
                        </LoadingContainer>
                    )}
                </Slider>
            </SliderWrapper>
            {/*{games.length > 0 && (*/}
            {/*    <GameShowcase showed={true} data={games[0]} darkerImage={true} isLoading={false} onLoad={() => !hideSkeleton && setHideSkeleton(true)}/>*/}
            {/*)}*/}
        </Container>
    );
}

function mapStateToProps(state) {
    return {
        games: state.homePageRequests.bestRatedGamesThisMonth
    }
}

const connectedTopRatedGames = connect(mapStateToProps)(TopRatedGames);

export default connectedTopRatedGames;