import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import {gameShowNeonBoxShadow, appColors} from "../utils/styles";
import {Button} from "@material-ui/core";
import CircularProgressWithLabel from "./CircularProgressWithLabel";
import CrossFadeImages from "./CrossFadeImages";
import {DateRange} from "@material-ui/icons";
import GameShowcaseSkeleton from "./GameShowcaseSkeleton";

const FullWidth = styled.div`
  display: flex;
  width: 988px;
  max-width: 100%;
  position: relative;
`

const Container = styled.div`
  width: 100%;
  height: 450px;
  //width: 1130px;
  //border: 0.5px solid #FFFFFF;
  border-radius: 32px;
    //box-shadow: ${gameShowNeonBoxShadow};
  background: ${appColors.backgroundContrast};
  display: flex;
  justify-content: space-between;
`

const ScreenshotContainer = styled.div`
  width: 50%;
  border-radius: 32px;
  position: relative;
`


const Title = styled.h3`
  font-size: 24px;
`

const GameInfoContainer = styled.div`
  width: 50%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  border-radius: 32px;
`

const GameInfoPadding = styled.div`
  padding: 24px;
`

const Space = styled.div`
  margin-bottom: ${props => props.height}px;
`

const DateContainer = styled.div`
  display: flex;
  align-items: center;
  color: #BDBDBD;
  font-size: 13px;
`

const GenresContainer = styled.div `
  display: flex;
`

const GenreButton = styled(Button)`
  height: 35px !important;
  margin-right: 8px !important;
  margin-bottom: 8px !important;
  padding: 16px !important;
`

const Summary = styled.p`
  text-overflow: ellipsis;
  max-height: 126px;
  display: -webkit-box;
  font-size: 14px;
  -webkit-line-clamp: 6;
  -webkit-box-orient: vertical;
  overflow: hidden;
`

const BottomContainer = styled.div`
  display: flex;
`

const SeeMoreContainer = styled.div`
  display: flex;
  justify-content: space-between;
  //height: 100%;
  align-items: center;
`

const SeeAllGamesButton = styled(Button)`
  margin-left: auto !important;
  padding: 12px 24px !important;
  font-size: 14px !important;
  background: ${appColors.backgroundContrast} !important;
  border-radius: 0 !important;
  border-top-left-radius: 32px !important;
  border-bottom-right-radius: 32px !important;
  box-shadow: 0 0 44px -20px ${appColors.secondary}, inset -18px -22px 32px -31px ${appColors.secondary} !important;
  font-weight: 500 !important;
  color: white !important;
  border-bottom: none !important;
  border-right: none !important;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 0 64px -5px ${appColors.secondary}, 0px 0px 8px #FFFFFF, inset -18px -22px 32px -31px ${appColors.secondary} !important;
  }
`

const BottomDarker = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 2;
  border-radius: 32px;
  background: linear-gradient( to bottom,rgba(0,0,0,0) 70%,rgba(0,0,0,0.7));
`

const Icon = styled(DateRange)`
  margin-right: 8px;
`

function GameShowcase(props) {
    function onLoad() {
        props.onLoad();
    }

    return (
        <>
        {props.isLoading ? (
                <GameShowcaseSkeleton />
            ) : (
                <FullWidth>
                    <Container>
                        <ScreenshotContainer>
                            {/*<Screenshot src={`https://images.igdb.com/igdb/image/upload/t_screenshot_huge/${props.data.screenshots[0].image_id}.jpg`} />*/}
                            {props.data.screenshots && (
                                <CrossFadeImages style={{borderRadius: 32}} images={props.data.screenshots} prefixUrl={"https://images.igdb.com/igdb/image/upload/t_screenshot_huge/"} interval={3000} onLoad={onLoad} />
                            )}
                            {props.darkerImage && (
                                <BottomDarker/>
                            )}
                        </ScreenshotContainer>

                        <GameInfoContainer>
                            <div>
                                <GameInfoPadding>
                                    <Space height={12}>
                                        <Title>{props.data.game}</Title>
                                    </Space>
                                    { props.data.releaseDate && (
                                        <Space height={16}>
                                            <DateContainer>
                                                <Icon  size="small"/>
                                                <div>{props.data.releaseDate.date} ({props.data.releaseDate.elapsedTime})</div>
                                            </DateContainer>
                                        </Space>
                                    )}
                                    {props.data.genres && (
                                        <Space height={18}>
                                            <GenresContainer>
                                                {props.data.genres.map((genre, i) => {
                                                    if (i < 2) {
                                                        return (
                                                            <GenreButton key={i} color="secondary" size="small" >{genre.name}</GenreButton>
                                                        )
                                                    } else {
                                                        return null
                                                    }
                                                })}
                                            </GenresContainer>
                                        </Space>
                                    )}
                                    {props.data.summary && (
                                        <Space height={24}>
                                            <Summary>{props.data.summary}</Summary>
                                        </Space>
                                    )}
                                    <SeeMoreContainer>
                                        <Button color="primary">See more</Button>
                                        <CircularProgressWithLabel value={props.data.rating} size={60}/>
                                    </SeeMoreContainer>

                                </GameInfoPadding>
                            </div>
                            <BottomContainer>
                                <SeeAllGamesButton color="secondary">
                                    See all games
                                </SeeAllGamesButton>
                            </BottomContainer>
                        </GameInfoContainer>
                    </Container>
                </FullWidth>
            )}
        </>
    );
}

GameShowcase.defaultProps = {
    darkerImage: false,
    isLoading: true
}

GameShowcase.propTypes = {
    data: PropTypes.object,
    darkerImage: PropTypes.bool,
    isLoading: PropTypes.bool,
    onLoad: PropTypes.func
}

export default GameShowcase;