import React from 'react'
import "./CarouselItem.css"
import { Button } from "@material-ui/core";
import PropTypes from 'prop-types';
import CircularProgressWithLabel from "../CircularProgressWithLabel/CircularProgressWithLabel"

//TODO Gerer animation de chargement de l'image
//     Responsive

function CarouselItem({ imageId, isSelected, title, category, company, companyLogoId, rate }) {
    return (
        <div className={isSelected ? "carousel__item selected" : "carousel__item"}>
            <img className={isSelected ? "carousel__item__image selected" : "carousel__item__image"} alt="slider" src={"https://images.igdb.com/igdb/image/upload/t_screenshot_med/" + imageId + ".jpg"} />

            <div className={isSelected ? "carousel__item__legend selected" : "carousel__item__legend"}>
                <div className="carousel__item__bottom">
                    <div>
                        <h2>{title}</h2>
                    </div>
                    {category &&
                        <div className="carousel__item__category">
                            <Button color="secondary">{category}</Button>
                        </div>
                    }
                    <div className="carousel__item__legend__company">
                        <img alt="company logo" src={`https://images.igdb.com/igdb/image/upload/t_logo_med/${companyLogoId}.png`}></img>
                        <p>{company}</p>
                    </div>
                    <Button color="primary">See more</Button>
                </div>
            </div>
            <div className={isSelected ? "carousel__item__critic selected" : "carousel__item__critic"}>
                <div className="carousel__item__bottom">
                    <div>
                        <CircularProgressWithLabel value={rate} />
                    </div>
                </div>
            </div>
        </div>)
}

CarouselItem.prototype = {
    imageId: PropTypes.string.isRequired,
    isSelected: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    category: PropTypes.string,
    company: PropTypes.string,
    companyLogoId: PropTypes.string,
    rate: PropTypes.number
}

export default CarouselItem;