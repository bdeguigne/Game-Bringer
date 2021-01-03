import React, {useEffect} from "react";
import styled from "styled-components";
import {gameShowNeonBoxShadow, appColors} from "../utils/styles";
import {DateRange} from "@material-ui/icons";
import {Button} from "@material-ui/core";
import CircularProgressWithLabel from "./CircularProgressWithLabel";


const Center = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`

const Container = styled.div`
  max-width: 100%;
  height: 450px;
  //width: 1130px;
  border: 0.5px solid #FFFFFF;
  border-radius: 32px;
  box-shadow: ${gameShowNeonBoxShadow};
  background: ${appColors.backgroundContrast};
  display: flex;
  justify-content: space-between;
`

const ScreenshotContainer = styled.div`
  width: 50%;
  border-radius: 32px;
`

const Screenshot = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 32px;
`

const Title = styled.h3`
  font-size: 24px;
`

const GameInfoContainer = styled.div`
  width: 50%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
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

const Icon = styled(DateRange)`
  width: 0.8em !important;
  margin-right: 8px;
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
  height: 100%;
  align-items: center;
`

const SeeAllGamesContainer = styled(Button)`
  margin-left: auto !important;
  padding: 12px 24px !important;
  font-size: 14px !important;
  background: ${appColors.backgroundContrast} !important;
  border-radius: 0 !important;
  border-top-left-radius: 32px !important;
  border-bottom-right-radius: 32px !important;
  box-shadow: 0px 0px 44px -20px ${appColors.secondary}, inset -18px -22px 32px -31px ${appColors.secondary} !important;
  font-weight: 500 !important;
  color: white !important;
  
  &:hover {
    transition: all 0.3s ease;
    box-shadow: 0px 0px 64px -5px ${appColors.secondary}, 0px 0px 8px #FFFFFF, inset -18px -22px 32px -31px ${appColors.secondary} !important;
  }
`

function GameShowcase({data}) {
    useEffect(() => {
        console.log("IN GAMES SHOWCASE", data);
    }, [data])

    return (
        <Center>
            <Container>
                <ScreenshotContainer>
                    {data.screenshots && (
                        <Screenshot src={`https://images.igdb.com/igdb/image/upload/t_screenshot_huge/${data.screenshots[0].image_id}.jpg`} />
                    )}
                </ScreenshotContainer>

                <GameInfoContainer>
                    <div>
                        <GameInfoPadding>
                            <Space height={12}>
                                <Title>{data.game}</Title>
                            </Space>
                            { data.releaseDate && (
                                <Space height={16}>
                                    <DateContainer>
                                        <Icon size="small"/>
                                        <div>{data.releaseDate.date} ({data.releaseDate.elapsedTime})</div>
                                    </DateContainer>
                                </Space>
                            )}
                            {data.genres && (
                                <Space height={18}>
                                    <GenresContainer>
                                        {data.genres.map((genre, i) => {
                                            if (i < 2) {
                                                return (
                                                    <GenreButton color="secondary" size="small" >{genre.name}</GenreButton>
                                                )
                                            } else {
                                                return null
                                            }
                                        })}
                                    </GenresContainer>
                                </Space>
                            )}
                            {data.summary && (
                                <Space height={24}>
                                    <Summary>{data.summary}</Summary>
                                </Space>
                            )}
                            <SeeMoreContainer>
                                <Button color="primary">See more</Button>
                                <CircularProgressWithLabel value={data.rating} size={60}/>
                            </SeeMoreContainer>

                        </GameInfoPadding>
                    </div>
                    <BottomContainer>
                        <SeeAllGamesContainer color="secondary">
                            See all games
                        </SeeAllGamesContainer>
                    </BottomContainer>
                </GameInfoContainer>
            </Container>
        </Center>
    );
}

export default GameShowcase;