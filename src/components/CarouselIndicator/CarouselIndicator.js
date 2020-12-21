import React from "react";
import "./CarouselIndicator.css";
import { FiberManualRecordRounded } from "@material-ui/icons";
import { ButtonBase } from "@material-ui/core"

function CarouselIndicator({ itemCount, onClick, selectedIndex, setSelectedIndex }) {

    const handler = (index) => {
        setSelectedIndex(index);
        onClick(index);
    }

    const handleActive = (selectedIndex, i) => {
        if (selectedIndex === i) {
            return "carouselIndicator__indicator--active"
        } else {
            return "carouselIndicator__indicator--inactive"
        }
    }

    return (
        <div>
            {Array.from(Array(itemCount), (e, i) => {
                return (
                    <ButtonBase key={i} onClick={() => handler(i)} className="carouselIndicator__buttonBase">
                        <FiberManualRecordRounded className={handleActive(selectedIndex, i)} />
                    </ButtonBase>
                )
            })}
        </div>
    )
}

export default CarouselIndicator;