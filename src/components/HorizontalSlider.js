import React, { useEffect, useState } from "react"
import Glide from '@glidejs/glide'
import { IconButton } from "@material-ui/core";
import { ArrowBackIos, ArrowForwardIos } from "@material-ui/icons"
import Skeleton from '@material-ui/lab/Skeleton';
import styled from 'styled-components';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { SkeletonColor } from "../utils/styles";
import { connect } from 'react-redux';


const Header = styled.div`
    display: flex;
    justify-content: space-between;
`;

const Title = styled.h3`
    margin-top: 32px;
    margin-bottom: 16px;
`;

const ArrowContainer = styled.div`
    display: flex;
    align-items: flex-end;
`;

const Slider = styled.div`
    overflow-x: hidden;
    user-select: none;
    height: 225px;
    padding-top: 16px;

    @media only screen and (min-width: 768px) {
        /* Desktop only */
        height: 285px;
    }
`;

const Slide = styled.div`
    display: flex;
`

const Arrow = styled(IconButton)`
    width: 50px;
    height: 50px;
    margin-left: 4px !important;
    margin-right: 4px !important;
`

// TODO Separer le 'CardStyle' Skeleton et Normal dans un fichier appart 
const CardStyleSkeleton = styled(Skeleton)`
    height: 245px !important;
    width: 180px;
    border-radius: 8px;
    display: flex;
    width: 100%;
    overflow-y: hidden;
    box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.527);
    transition: all ease 500ms;
    background-color: ${SkeletonColor} !important;

    &:hover {
        box-shadow: 0px 7px 16px rgba(0, 0, 0, 0.527);
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
    perView: 8,
    focusAt: 0,
    gap: 16,
    bound: true,
    breakpoints: {
        1780: {
            perView: 7,
        },
        1600: {
            perView: 6,
        },
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

const HorizontalSlider = ({ sliderName, title, children, isLoading, menuExpanded }) => {
    const ref = React.useRef();

    const [slider] = useState(new Glide(`#${sliderName}`, sliderConfiguration));

    useEffect(() => {
        slider.mount();

        slider.on('run.before', (evt) => {
            const scrollSteps = slider.settings.perView;
            evt.steps = evt.direction === '>' ? -scrollSteps : scrollSteps;
            // ... do something cool here
        })

        // return () => slider.destroy()

    }, [slider, ref, sliderName])

    useEffect(() => {
        if (isLoading === false) {
            slider.mount();
        }
    }, [isLoading, slider])

    return (
        <div>
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
            <Slider id={sliderName}>
                <div className="glide__track" data-glide-el="track">

                    {isLoading === true && (
                        <Slide className="glide__slides">
                            {Array.from({ length: 8 }, (item, index) => {
                                return <CardStyleSkeleton key={index} variant="rect" animation="wave" />
                            })}
                        </Slide>
                    )}

                    {isLoading === false && (
                        <Slide className="glide__slides">
                            { children}
                        </Slide>
                    )}
                </div>
            </Slider>
        </div >
    )
}

function mapStateToProps(state) {
    return {
        menuExpanded: state.uiReducer.menuExpanded
    }
}

const connectedHorizontalSlider = connect(mapStateToProps)(HorizontalSlider)

export default connectedHorizontalSlider;