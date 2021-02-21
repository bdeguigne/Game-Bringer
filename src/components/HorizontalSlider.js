import React, { useEffect, useState } from "react"
import Glide from '@glidejs/glide'
import { IconButton } from "@material-ui/core";
import { ArrowBackIos, ArrowForwardIos } from "@material-ui/icons"
import Skeleton from '@material-ui/lab/Skeleton';
import styled from 'styled-components';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {SectionTitle, appColors} from "../utils/styles";
import { connect } from 'react-redux';

const Container = styled.div`
  margin-top: 16px;
  margin-bottom: 48px;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled(SectionTitle)`
  margin-bottom: 0;
`;

const ArrowContainer = styled.div`
  display: flex;
  align-items: flex-end;
`;


const SliderContainer = styled.div`
  height: 245px;
  position: relative;
  padding-top: 16px;
`

const Slide = styled.div`
  display: flex;
  width: 90%;
  //opacity: ${props => props.hide ? 0 : 1};
  //transition: opacity,transform 0.5s ease-in-out !important;
`

const Slider = styled.div`
  overflow-x: hidden;
  user-select: none;
  //height: 225px;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  padding: 16px 0;
  opacity: ${props => props.hide ? 0 : 1};
  transition: opacity 0.5s !important;
  @media only screen and (min-width: 768px) {
    /* Desktop only */
    height: 285px;
  }
`;


const Arrow = styled(IconButton)`
  width: 50px;
  height: 50px;
  margin-left: 4px !important;
  margin-right: 4px !important;
`

const CardStyleSkeleton = styled(Skeleton)`
  height: 245px !important;
  //width: 180px;
  border-radius: 8px;
  display: flex;
  width: 100%;
  overflow-y: hidden;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.527);
  transition: all ease 500ms;
  background-color: ${props => appColors[props.theme][900]} !important;

  &:hover {
    box-shadow: 0 7px 16px rgba(0, 0, 0, 0.527);
    transform: translateY(-10px);
  }

  @media only screen and (min-width: 768px) {
    height: 265px !important;
  }
`

const sliderConfiguration = {
    type: "slider",
    startAt: 0,
    animationTimingFunc: "ease-in-out",
    perView: 5,
    focusAt: 0,
    gap: 16,
    bound: true,
    breakpoints: {
        1380: {
            perView: 5
        },
        1160: {
            perView: 4
        },
        960: {
            perView: 3
        },
        540: {
            perView: 2
        },
        374: {
            perView: 1
        }
    },
    animationDuration: 500
};

const HorizontalSlider = ({ sliderName, title, children, isLoading, imageLoaded, removeSkeleton, theme }) => {
    const [slider] = useState(new Glide(`#${sliderName}`, sliderConfiguration));
    const [sliderSkeleton] = useState(new Glide(`#${sliderName}-skeleton`, sliderConfiguration));

    useEffect(() => {
        if (removeSkeleton === false) {
            sliderSkeleton.mount();
        }

    }, [sliderSkeleton, sliderName, removeSkeleton])

    useEffect(() => {
        if (isLoading === false) {
            slider.mount();

            slider.on('run.before', (evt) => {
                const scrollSteps = slider.settings.perView;
                evt.steps = evt.direction === '>' ? -scrollSteps : scrollSteps;
            })

        }
    }, [isLoading, slider])

    useEffect(() => {
        if (removeSkeleton === true)
            sliderSkeleton.destroy();
    }, [removeSkeleton, sliderSkeleton]);


    return (
        <Container>
            <Header>
                <Title>{title}</Title>
                <ArrowContainer>
                    <Arrow size="small" onClick={() => slider.go("<")}>
                        <ArrowBackIos />
                    </Arrow>

                    <Arrow size="small" onClick={() => slider.go(">")}>
                        <ArrowForwardIos />
                    </Arrow>
                </ArrowContainer>
            </Header>
            <SliderContainer >
                {isLoading === false && (
                    <Slider id={sliderName}  hide={!imageLoaded}>
                        <div className="glide__track" data-glide-el="track">
                            <Slide className="glide__slides">
                                { children }
                            </Slide>
                        </div>
                    </Slider>
                )}
                {!removeSkeleton && (
                    <Slider id={`${sliderName}-skeleton`} hide={imageLoaded}>
                        <div className="glide__track" data-glide-el="track">
                            <Slide className="glide__slides" >
                                {Array.from({ length: 5 }, (item, index) => {
                                    return <CardStyleSkeleton key={index} variant="rect" animation="wave" theme={theme} />
                                })}
                            </Slide>
                        </div>
                    </Slider>
                )}
            </SliderContainer>
        </Container >
    )
}

function mapStateToProps(state) {
    return {
        menuExpanded: state.uiReducer.menuExpanded,
        theme: state.uiReducer.theme
    }
}

const connectedHorizontalSlider = connect(mapStateToProps)(HorizontalSlider)

export default connectedHorizontalSlider;