import React from "react";
import "./CarouselIndicator.css";
import { FiberManualRecordRounded, ArrowBackIos, ArrowForwardIos } from "@material-ui/icons";
import { ButtonBase, IconButton } from "@material-ui/core";
import { CircularProgress } from '@material-ui/core';
import styled from 'styled-components';
import { appColors } from '../../utils/styles'

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
    transition: color 0.3s ease-in-out !important;
    width: 20px !important;
    color: ${props => props.isselected === "true" ? appColors[300] : appColors[600] };
`

function CarouselIndicator({ itemCount, onClick, selectedIndex, setSelectedIndex, loadingStatus, onLeftArrowClick, onRightArrowClick }) {

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
        if (selectedIndex === i) {
            return true
        } else {
            return false
        }
    }

    if (loadingStatus === null) {
        return (
            <div>
                <ArrowButton size="medium" onClick={leftArrowHandler}>
                    <ArrowBackIos />
                </ArrowButton>
                {Array.from(Array(itemCount), (e, i) => {
                    return (
                        <Indicator key={i} onClick={() => handler(i)}>
                            <RoundedIcon isselected={isActive(selectedIndex, i).toString()} />
                        </Indicator>
                    )
                })}
                <ArrowButton size="medium" onClick={rightArrowHandler}>
                    <ArrowForwardIos />
                </ArrowButton>
            </div>
        )
    } else {
        return (
            <Loading value={loadingStatus} variant="determinate" />
        )
    }
}

export default CarouselIndicator;