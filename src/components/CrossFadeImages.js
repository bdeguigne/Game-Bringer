/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import styled from "styled-components";
import "./CrossFadeImage.css";

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`

const CrossFadeImages = props => {
    const [showedImageIndex, setShowedImageIndex] = useState(0);
    const [next, setNext] = useState(false);
    const [nextIndex, setNextIndex] = useState(-1);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        let interval;
        if (props.interval !== undefined) {
            interval = setInterval(() => setNext(true), props.interval);
        }
        return () => {
            clearInterval(interval);
        };
    }, [props.interval]);

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
        if (loaded === true) {
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

    // function goNext() {
    //     setNext(true);
    //     setNextIndex(getNextIndex());
    //     setTimeout(incrementIndex, 550);
    // }

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
        <Container>
            {props.images && props.images.map((image, index) => {
                const url = props.prefixUrl + image.image_id + ".jpg"
                if (showedImageIndex === index) {
                    return <img onLoad={onLoad}  style={props.style} key={index} className={next ?  "crossFade fadeOut" : "crossFade active" } src={url} alt={"Slider image" + index}/>
                }
                else {
                    return <img style={props.style} key={index} className={nextIndex === index ? "crossFade fadeIn" : "crossFade"} src={url} alt={"Slider image" + index} />
                }
            })}
            {/*<Button style={{zIndex: 5}} color="secondary" onClick={goNext}>next</Button>*/}
            {/*<Button style={{zIndex: 5}} color="secondary" onClick={() => goToIndex(0)}>go to 3</Button>*/}
        </Container>
    );
};

CrossFadeImages.propTypes = {
    images: PropTypes.array.isRequired,
    prefixUrl: PropTypes.string.isRequired,
    interval: PropTypes.number,
    index: PropTypes.number,
    style: PropTypes.object,
    onLoad: PropTypes.func
};

export default CrossFadeImages;
