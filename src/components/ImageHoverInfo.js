import React from "react"
import styled from "styled-components";

//TODO Abstraire ce composant pour pouvoir appeler facilement un composant qui sera affiché en hover interactif

//TODO Changer ce style en parametre pour pouvoir gerer ce composant sous differentes tailles / styles
export const CardStyleContainer = styled.div`
    height: 245px;
    width: 180px;
    border-radius: 8px;
    display: flex;
    width: 100%;
    overflow-y: hidden;
    box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.527);
    transition: all ease 500ms;

    &:hover {
        box-shadow: 0px 7px 16px rgba(0, 0, 0, 0.527);
        transform: translateY(-10px);
    }

    @media only screen and (min-width: 768px) {
        height: 265px !important;
    }
`

const ShowOnHoverContainer = styled.div`
    height: 100%;
    width: 100%;
    position: relative;
    z-index: 3;
    color: white;
    opacity: 0;
    transform: translateY(300px);
    transition: 0.5s ease;
`

const Wrapper = styled.div`
    display: flex;
    align-items: flex-end;
    width: 100%;
    height: 100%;
    transition: all ease 300ms;
    position: relative;

    &:hover {
        &::before {
            box-shadow: 0px 7px 16px rgba(0, 0, 0, 0.527);
            opacity: 1;
        }
    }

    &:hover ${ShowOnHoverContainer} {
        opacity: 1;
        transform: translateY(0px);
    }

    &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        display: block;
        width: 100%;
        height: 100%;
        border-radius: 8px;
        background: rgba(10, 10, 10, 0.6);
        z-index: 2;
        transition: 0.5s;
        opacity: 0;
    }
`

const Image = styled.img`
    box-shadow: 2px 2px 16px rgba(0, 0, 0, 0.527);
    transition: all ease 300ms;
    position: absolute;
    top: 0;
    left: 0;
    object-fit: cover;

    /* Copy paste Container style */
    height: 245px !important;
    width: 180px;
    border-radius: 8px;
    display: flex;
    width: 100%;
    overflow-y: hidden;
    box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.527);
    transition: all ease 500ms;

    &:hover {
        box-shadow: 0px 7px 16px rgba(0, 0, 0, 0.527);
        transform: translateY(-10px);
    }

    @media only screen and (min-width: 768px) {
        height: 265px !important;
    }
`

// TODO Cover placeholder si cover == null

function ImageHoverInfo({ className, coverID, children, onMouseEnter, onMouseLeave, gameID }) {
    return (
        <CardStyleContainer onMouseEnter={() => onMouseEnter && onMouseEnter(gameID)} onMouseLeave={() => onMouseLeave && onMouseLeave(gameID)}>
            <Wrapper>
                <Image alt="item" src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${coverID}.jpg`} />
                <ShowOnHoverContainer>
                    {children}
                </ShowOnHoverContainer>
            </Wrapper>
        </CardStyleContainer>
    )
}

export default ImageHoverInfo;