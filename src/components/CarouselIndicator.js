import React from "react";
import { FiberManualRecordRounded, ArrowBackIos, ArrowForwardIos } from "@material-ui/icons";
import { ButtonBase, IconButton } from "@material-ui/core";
import { CircularProgress } from '@material-ui/core';
import styled from 'styled-components';
import {appColors} from '../utils/styles'

const ArrowContainer = styled.div`
  display: none;
  //
  @media only screen and (min-width: 768px) {
    display: block;
  }
`

const Container = styled.div`
  margin-bottom: 24px;
  display: flex;
  justify-content: center;
  width: 100%;
`

const ArrowButton = styled(IconButton)`
  margin-left: 16px !important;
  margin-right: 16px !important;
`

const Indicator = styled(ButtonBase)`
  width: 24px !important;
  border-radius: 100% !important;
`

const Loading = styled(CircularProgress)`
  width: 24px !important;
  height: 24px !important;
`

const RoundedIcon = styled(FiberManualRecordRounded)`
  border-radius: 50% !important;
  transition: color 0.3s ease !important;
  color: ${props => props.isselected === "true" ? appColors[props.theme][300] : appColors[props.theme].secondaryDarker };
  box-shadow: ${props => props.isselected === "true" ? `0 0 50px -5px #fff, 0 0 50px -9px ${appColors[props.theme].secondary}, inset 0px 0px 30px -31px rgb(255 255 255), 0 0 4rem -15px ${appColors[props.theme].secondary}` : "none"};
`

function CarouselIndicator({ itemCount, onClick, selectedIndex, setSelectedIndex, loadingStatus, onLeftArrowClick, onRightArrowClick, theme }) {

    const handler = (index) => {
        setSelectedIndex(index);
        onClick(index);
    }

    const leftArrowHandler = () => {
        setSelectedIndex(selectedIndex - 1);
        if (onLeftArrowClick) {
            onLeftArrowClick();
        }
    }

    const rightArrowHandler = () => {
        setSelectedIndex(selectedIndex + 1);
        if (onRightArrowClick) {
            onRightArrowClick();
        }
    }

    const isActive = (selectedIndex, i) => {
        return selectedIndex === i;
    }

    if (loadingStatus === null) {
        return (
            <Container>
                <ArrowContainer>
                    <ArrowButton size="medium" onClick={leftArrowHandler}>
                        <ArrowBackIos />
                    </ArrowButton>
                </ArrowContainer>
                {Array.from(Array(itemCount), (e, i) => {
                    return (
                        <Indicator key={i} onClick={() => handler(i)} isselected={isActive(selectedIndex, i).toString()}>
                            <RoundedIcon isselected={isActive(selectedIndex, i).toString()} theme={theme}/>
                        </Indicator>
                    )
                })}
                <ArrowContainer>
                    <ArrowButton size="medium" onClick={rightArrowHandler}>
                        <ArrowForwardIos />
                    </ArrowButton>
                </ArrowContainer>
            </Container>
        )
    } else {
        return (
            <Loading value={loadingStatus} variant="determinate" />
        )
    }
}

export default CarouselIndicator;