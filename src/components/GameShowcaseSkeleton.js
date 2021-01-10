import React from 'react';
import styled from "styled-components";
import {Skeleton} from "@material-ui/lab";
import {appColors, gameShowNeonBoxShadow, SkeletonColor} from "../utils/styles";

const FullWidth = styled.div`
  display: flex;
  width: 988px;
  max-width: 100%;
`

const ScreenshotContainer = styled.div`
  width: 50%;
  border-radius: 32px;
  position: relative;
`

const ScreenshotSkeleton = styled(Skeleton)`
  background-color: ${SkeletonColor} !important;
  width: 100% !important;
  height: 100% !important;
  border-radius: 32px;
`

const TextSkeleton = styled(Skeleton)`
  border-radius: 6px;
  background-color: ${SkeletonColor} !important;
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

const GameInfoContainer = styled.div`
  width: 50%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  border-radius: 32px;
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

const GameShowcaseSkeleton = () => {
    return (
        <FullWidth>
            <Container>
                <ScreenshotContainer>
                    <ScreenshotSkeleton variant="rect"/>
                </ScreenshotContainer>

                <GameInfoContainer>
                    <GameInfoPadding>
                        <Space height={12}>
                            <TextSkeleton width={"80%"} height={"40px"} animation="wave" variant="rect" />
                        </Space>
                        <Space height={16}>
                            <DateContainer>
                                <TextSkeleton width={"40%"} animation="wave" variant="rect" />
                            </DateContainer>
                        </Space>
                        <Space height={18}>
                            <GenresContainer>
                                <GenreSkeleton width={"30%"} height={"35px"} animation="wave" variant="rect"/>
                                <GenreSkeleton width={"30%"} height={"35px"} animation="wave"  variant="rect"/>
                            </GenresContainer>
                        </Space>
                        <Space height={24}>
                            <TextSkeleton width={"100%"} height={"166px"} animation="wave"  variant="rect"/>
                        </Space>

                    </GameInfoPadding>
                </GameInfoContainer>
            </Container>
        </FullWidth>
    );
};

export default GameShowcaseSkeleton;
