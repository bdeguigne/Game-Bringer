import React, { useState, useEffect } from "react";
import "./CardGameInfo.css";
import { Button } from "@material-ui/core";
import styled from 'styled-components';
import VideoPlayer from '../VideoPlayer/VideoPlayer';

const Container = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`

const Top = styled.div`
     height: 43%;
`

const Bottom = styled.div`
    padding: 8px;
    height: 55%;
    background: linear-gradient(302.44deg, #6D5DD3 -39.41%, ${props => props.backgroundColor} 107.01%);
`

const Title = styled.div`
    font-size: 16px;
    font-weight: 500;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
`

const BottomGenres = styled.div`
    display: flex;
    margin-top: 8px;
`

const Genre = styled(Button)`
    height: 24px !important;
    font-size: 10px !important;
    padding: 6px 8px !important;
    margin: 0px 8px 8px 0px !important;
`

function CardGameInfo({ title, genres, isHovered, videoID }) {

    const [randomIndex, setRandomIndex] = useState(0);

    const backgroundColors = [
        "#611C35",
        "#5B6C5D",
        "#B20D30",
        "#202C39",
        "#131515",
        "#27213C",
        "#A33B20",
        "#EB6424",
        "#083D77",
        "#456990"
    ]

    useEffect(() => {
        const random = (Math.random() * (9 - 0 + 1)) << 0;
        setRandomIndex(random);
    }, [])

    // useEffect(() => {
    //     if (isHovered === true) {
    //         console.log(title + "Hovered !");
    //     }
    // }, [isHovered])

    return (
        <Container>
            <Top>
                {isHovered === true && (
                    <VideoPlayer className="card-slider-video" videoID={videoID} playtime="15"/>
                )}
            </Top>
            <Bottom backgroundColor={backgroundColors[randomIndex]}>
                <Title>{title}</Title>
                <BottomGenres>
                    <div>
                        {genres && genres.map((genre, i) => {
                            if (i < 3) {
                                return (
                                    <Genre key={i} color="secondary">{genre.name}</Genre>
                                )
                            }
                            return null
                        })}
                    </div>
                </BottomGenres>
            </Bottom>

        </Container>
    )
}

export default CardGameInfo;