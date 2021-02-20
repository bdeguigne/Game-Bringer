import React from 'react';
import styled from "styled-components";
import {Skeleton} from "@material-ui/lab";
import {appColors} from "../utils/styles";
import {FullWidthContainer, Container, ScreenshotContainer, GameInfoContainer} from "./GameShowcase";

const ScreenshotSkeleton = styled(Skeleton)`
  background-color: ${props => appColors[props.theme][900]} !important;
  width: 100% !important;
  height: 100% !important;
  border-radius: 0;

  @media only screen and (min-width: 768px) {
    width: 50%;
    height: 100%;
    border-radius: 32px;
  }
`

const TextSkeleton = styled(Skeleton)`
  border-radius: 6px;
  background-color: ${props => appColors[props.theme][900]} !important;
  width: ${props => props.width + " !important"};
  height: ${props => props.height + " !important"};
`

const GenreSkeleton = styled(TextSkeleton)`
  margin-right: 8px !important;
  margin-bottom: 8px !important;
  border-radius: 10px !important;
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

const GameShowcaseSkeleton = ({theme}) => {
    return (
        <FullWidthContainer>
            <Container theme={theme}>
                <ScreenshotContainer>
                    <ScreenshotSkeleton variant="rect" theme={theme}/>
                </ScreenshotContainer>

                <GameInfoContainer>
                    <GameInfoPadding>
                        <Space height={12}>
                            <TextSkeleton width={"80%"} height={"40px"} animation="wave" variant="rect" theme={theme} />
                        </Space>
                        <Space height={16}>
                            <DateContainer>
                                <TextSkeleton width={"40%"} animation="wave" variant="rect" theme={theme} />
                            </DateContainer>
                        </Space>
                        <Space height={18}>
                            <GenresContainer>
                                <GenreSkeleton width={"30%"} height={"35px"} animation="wave" variant="rect" theme={theme}/>
                                <GenreSkeleton width={"30%"} height={"35px"} animation="wave"  variant="rect" theme={theme}/>
                            </GenresContainer>
                        </Space>
                        <Space height={24}>
                            <TextSkeleton width={"100%"} height={"166px"} animation="wave"  variant="rect" theme={theme}/>
                        </Space>

                    </GameInfoPadding>
                </GameInfoContainer>
            </Container>
        </FullWidthContainer>
    );
};

export default GameShowcaseSkeleton;
