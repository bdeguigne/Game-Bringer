/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import styled from "styled-components";
import "./CrossFadeImage.css";
import {crossFadeImagesBoxShadow} from "../utils/styles";
import ImageLoader from "./ImageLoader";

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  box-shadow: ${ props => props.shadow ? crossFadeImagesBoxShadow : null};
`

const CrossFadeImages = props => {
    const [showedImageIndex, setShowedImageIndex] = useState(0);
    const [next, setNext] = useState(false);
    const [nextIndex, setNextIndex] = useState(-1);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        let interval;
        if (props.interval !== undefined && props.active && props.images && props.images.length > 1) {
            interval = setInterval(() => setNext(true), props.interval);
        }

        if (props.interval !== undefined && !props.active) {
            clearInterval(interval);
        }
        return () => {
            clearInterval(interval);
        };
    }, [props.interval, props.active]);

    useEffect(() => {
        if (next && props.interval) {
            setNextIndex(getNextIndex());
            setTimeout(incrementIndex, 550);
        }
    }, [next]);

    useEffect(() => {
        if (props.index !== undefined) {
            goToIndex(props.index);
        }
    }, [props.index])

    useEffect(() => {
        if (loaded === true && props.onLoad) {
            props.onLoad();
        }
    }, [loaded]);



    function getNextIndex() {
        if (showedImageIndex + 1 >= props.images.length)
            return 0;
        else
            return showedImageIndex + 1;
    }

    function incrementIndex() {
        if (showedImageIndex + 1 >= props.images.length)
            setShowedImageIndex(0);
        else
            setShowedImageIndex(showedImageIndex + 1);
        setNext(false);
    }

    function goToIndex(index) {
        if (index !== showedImageIndex) {
            setNext(true)
            setNextIndex(index);
            setTimeout(() => {
                setShowedImageIndex(index)
                setNext(false);
            }, 550);
        }
    }

    function onLoad() {
        if (loaded === false) {
            setLoaded(true);
        }
    }

    return (
        <Container style={{borderRadius : props.style.borderRadius}} shadow={props.elevation}>
            {props.images && props.images.map((image, index) => {
                const url = props.prefixUrl + image.image_id + ".jpg"
                if (props.skeletonOnLoadingImages) {
                    if (showedImageIndex === index) {
                        return <ImageLoader onLoad={onLoad}  style={props.style} key={index} className={next ?  "crossFade fadeOut" : "crossFade active" } src={url}/>
                    }
                    else {
                        return <ImageLoader style={props.style} key={index} className={nextIndex === index ? "crossFade fadeIn" : "crossFade"} src={url} />
                    }
                } else {
                    if (showedImageIndex === index) {
                        return <img onLoad={onLoad}  style={props.style} key={index} className={next ?  "crossFade fadeOut" : "crossFade active" } src={url} alt={"Slider " + index}/>
                    }
                    else {
                        return <img style={props.style} key={index} className={nextIndex === index ? "crossFade fadeIn" : "crossFade"} src={url} alt={"Slider " + index} />
                    }
                }
            })}

        </Container>
    );
};

CrossFadeImages.defaultProps = {
    active: false,
    skeletonOnLoadingImages: false,
    elevation: true
}

CrossFadeImages.propTypes = {
    images: PropTypes.array.isRequired,
    prefixUrl: PropTypes.string.isRequired,
    interval: PropTypes.number,
    index: PropTypes.number,
    style: PropTypes.object,
    onLoad: PropTypes.func,
    active: PropTypes.bool,     //if false, disable automatic cross fade between image for better performance
    skeletonOnLoadingImages: PropTypes.bool,
    elevation: PropTypes.bool,
};

export default CrossFadeImages;
