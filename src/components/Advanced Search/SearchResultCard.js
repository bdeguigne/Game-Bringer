import React from 'react';
import PropTypes from 'prop-types';
import styled from "styled-components";
import {appColors, resultItemBoxShadow} from "../../utils/styles";
import {Tooltip, ButtonBase} from "@material-ui/core";
import CircularProgressWithLabel from "../CircularProgressWithLabel";

const Container = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  border-radius: 16px;
  background-color: ${appColors.searchResultItemBackground};
  box-shadow: ${resultItemBoxShadow};
  margin-bottom: 8px;
  transition: background-color 0.3s ,box-shadow 0.3s, transform 0.3s;
  cursor: pointer;

  &:hover {
    transform: scale(1.01);
    background-color: #0F0A10;
    box-shadow: 0px 0px 40px -20px #6D5DD3, 0px 0px 15px -8px rgba(255, 255, 255, 0.5);
  }
`

const RippleEffect = styled(ButtonBase)`
  width: 100%;
  border-radius: 16px !important;
  font-family: 'Montserrat', sans-serif;
  text-align: left !important;
`

const CoverContainer = styled.div`
  width: 100px;
  height: 100%;
`

const Cover = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
  border-radius: 16px;
  transform: scale(0.95);
`

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100%;
`

const LeftContent = styled.div`
  margin: 4px 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  //width: 60%;
`

const Game = styled.div`
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 4px;
`
const Developer = styled.div`
  color: #AFAFAF;
  font-size: 14px;
`

const PlatformsContainer = styled.div`
  display: flex;
`

const PlatformLogo = styled.img`
  width: 25px;
  height: 25px;
  object-fit: cover;
  margin-right: 8px;
  filter: grayscale();
  transition: filter 0.5s ease;
  &:hover {
    filter: none;
  }
`

const ContentCenter = styled.div`
  display: flex;
  align-items: center;
  margin: 4px 8px;
`

const DateContainer = styled.div`
  text-align: center;
  color: #B2B2B2;
  font-size: 14px;
`



const SearchResultCard = props => {
    return (

        <Container>
            <RippleEffect>
                <CoverContainer>
                    <Cover alt={"Result game cover"} src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${props.coverId}.jpg`}/>
                </CoverContainer>
                <Content>
                    <LeftContent>
                        <div>
                            <Game>
                                {props.game}
                            </Game>
                            <Developer>
                                {props.developer}
                            </Developer>
                        </div>
                        <PlatformsContainer>
                            {props.platforms.map((platform, i) => {
                                return (
                                    <Tooltip key={i} title={platform.name}>
                                        <PlatformLogo  alt={"platform logo"} src={`https://images.igdb.com/igdb/image/upload/t_logo_med/${platform.platform_logo.image_id}.png`} />
                                    </Tooltip>
                                )
                            })}
                        </PlatformsContainer>
                    </LeftContent>

                    <ContentCenter>
                        <DateContainer>
                            <div>{props.date.date}</div>
                            <div>({props.date.elapsedTime})</div>
                        </DateContainer>
                    </ContentCenter>

                    <ContentCenter>
                        <CircularProgressWithLabel value={props.rating} size={60}/>
                    </ContentCenter>
                </Content>

            </RippleEffect>
        </Container>

    );
};

SearchResultCard.propTypes = {
    game: PropTypes.string,
    developer: PropTypes.string,
    platforms: PropTypes.array,
    date: PropTypes.object,
    rating: PropTypes.number,
    coverId: PropTypes.string
};

export default SearchResultCard;
