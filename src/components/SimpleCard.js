import React from "react";
import styled from "styled-components";
import {Tooltip, Fade} from "@material-ui/core";
import FloatingGameDetails from "./FloatingGameDetails";
import {withRouter} from "react-router-dom"

const Image = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  object-fit: cover;

  /* Copy paste Container style */
  height: 245px !important;
  border-radius: 16px;
  display: flex;
  width: 100% !important;
  overflow-y: hidden;

  @media only screen and (min-width: 768px) {
    height: 265px !important;
  }
`

export const CardStyleContainer = styled.div`
  height: 245px;
  border-radius: 8px;
  display: flex;
  width: 180px;
  overflow-y: hidden;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.527);
  transition: all ease 500ms;
  cursor: pointer;

  &:hover {
    box-shadow: 0 7px 16px rgba(0, 0, 0, 0.527);
    transform: translateY(-10px);
  }

  @media only screen and (min-width: 768px) {
    height: 265px !important;
  }
`

const Wrapper = styled.div`
  display: flex;
  align-items: flex-end;
  width: 100%;
  height: 100%;
  transition: all ease 300ms;
  position: relative;

  overflow: hidden;

  &:hover {
    &::before {
      opacity: 0;
    }
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

const HoverInfo = styled(Tooltip)`
  padding: 0 !important;
`

function SimpleCard({ coverID, onLoad, game, history, theme }) {

    const onClick = () => {
        let urlTitle = game.gameName.split(' ').join('_');
        history.replace("/" + game.id + "/" + urlTitle);
        history.go();
    }

    return (
        <HoverInfo title={
            <FloatingGameDetails title={game.gameName} date={game.releasedDate?.date} elapsedTime={game.releasedDate?.elapsedTime} screenshots={game.screenshots} genres={game.genres} theme={theme}/>
        } placement={"right"} TransitionComponent={Fade} arrow={true}>

            <CardStyleContainer onClick={onClick}>
                <Wrapper>
                    {coverID ?
                        <Image onLoad={onLoad} alt="item" src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${coverID}.jpg`} />
                        :
                        <Image src={process.env.PUBLIC_URL + "/assets/placeholder-cover.png"}/>
                    }
                </Wrapper>
            </CardStyleContainer>
        </HoverInfo>
    )
}

export default withRouter(SimpleCard);