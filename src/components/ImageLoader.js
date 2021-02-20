import React, {useState} from 'react';
import PropTypes from 'prop-types';
import styled from "styled-components";
import {Skeleton} from "@material-ui/lab";
import {appColors} from "../utils/styles";

const Container = styled.div`
  width: 100%;
  height: 100%;
`

const SkeletonContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 4;
  transition: opacity 0.5s;
  opacity: ${props => props.hide ? 0 : 1};
`

const ScreenshotSkeleton = styled(Skeleton)`
  background-color: ${props => appColors[props.customtheme][900]} !important;
  width: 100% !important;
  height: 100% !important;
  border-radius: 32px;
`

//Show a skeleton placeholder when the image is loading
const ImageLoader = props => {
    const [loaded, setLoaded] = useState(false);
    const [onError, setOnError] = useState(false)


    const onLoad = () => {
        setLoaded(true);
        if (props.onLoad) {
            props.onLoad();
        }
    }

    return (
        <Container id={"IMAGE-LOADER"}>
            <img src={props.src} alt={"Game screenshot"} style={props.style} className={props.className} onLoad={onLoad} onError={() => setOnError(true)}/>

            {onError && (
                <img className={props.className} onLoad={onLoad} src={process.env.PUBLIC_URL + "/assets/placeholder-cover.png"} alt="placeholder"/>
            )}
            <SkeletonContainer hide={loaded}>
                <ScreenshotSkeleton variant="rect"  customtheme={props.theme} animation={"wave"} style={props.style && {borderRadius: props.style.borderRadius}} />
            </SkeletonContainer>
        </Container>
    );
};



ImageLoader.propTypes = {
    src: PropTypes.string,
    style: PropTypes.object,
    className: PropTypes.string,
    onLoad: PropTypes.func,
    theme: PropTypes.string.isRequired
};

export default ImageLoader;
