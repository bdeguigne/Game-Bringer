import React from 'react';
import PropTypes from 'prop-types';
import styled from "styled-components";
import { appColors, resultItemBoxShadow } from "../../utils/styles";
import { Tooltip, ButtonBase, Fade } from "@material-ui/core";
import { Skeleton } from '@material-ui/lab'
import FloatingGameDetails from "../FloatingGameDetails";
import CircularProgressWithLabel from "../CircularProgressWithLabel";
import ImageLoader from '../ImageLoader';
import {withRouter} from "react-router-dom"

const Container = styled.div`
  width: 100%;
  min-height: 100px;
  display: flex;
  border-radius: 16px;
  background-color: ${props => appColors[props.theme].searchResultItemBackground};
  box-shadow: ${resultItemBoxShadow};
  margin-bottom: 8px;
  transition: background-color 0.3s ,box-shadow 0.3s, transform 0.3s;
  cursor: pointer;

  &:hover {
    transform: scale(1.01);
    background-color: ${props => appColors[props.theme].searchResultItemBackgroundHover};
    box-shadow: ${props => `0px 0px 40px -20px ${appColors[props.theme].secondary}, 0px 0px 15px -8px rgba(255, 255, 255, 0.5)`} ;
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
  position: relative;
`

const Cover = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100px;
  border-radius: 16px;
  transform: scale(0.95);
`

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  /* height: 100%; */

  @media only screen and (min-width: 768px) {
    flex-direction: row;
  }
`

const GameHighlightWrapper = styled.div`
  margin: 4px 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  /* height: 100%; */

  @media only screen and (min-width: 768px) {
    width: 50%;
  }
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
  margin-top: 8px;
`

const PlatformLogo = styled.img`
  width: 17px;
  height: 17px;
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

const DateCenter = styled.div`
  display: none;
  align-items: center;
  margin: 4px 8px;

  @media only screen and (min-width: 768px) {
    display: flex;
  }
`

const RateContainer = styled.div`
  width: 65px;
`

const DateContainer = styled.div`
  display: flex;
  text-align: center;
  color: #B2B2B2;
  font-size: 14px;
  flex-direction: row;

  @media only screen and (min-width: 768px) {
    flex-direction: column;
  }
`

const HoverInfo = styled(Tooltip)`
  padding: 0 !important;
`

const GameContent = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: space-between;

  @media only screen and (min-width: 768px) {
    flex-direction: row;
    justify-content: initial;
  }
`

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
`

const FlexFullWidthHeight = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`

const DateMobileContainer = styled.div`
  display: flex;
  @media only screen and (min-width: 768px) {
    display: none;
    flex-direction: row;
    justify-content: initial;
  }
`

const RowContainer = styled.div`
  display: flex;
  width: 100%;
`


const SearchResultCard = props => {

  const handleClick = () => {
    let urlTitle = props.game.split(' ').join('_');
    props.history.push("/" + props.id + "/" + urlTitle);
  }

  const CardContent = () => {
    return (
      <Container theme={props.theme}>
        <RippleEffect onClick={handleClick}>
          <RowContainer>
            <Wrapper>
              <FlexFullWidthHeight>
                <CoverContainer>
                  {props.coverId ? (
                    // <Cover alt={"Result game cover"} src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${props.coverId}.jpg`} />
                    <ImageLoader src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${props.coverId}.jpg`} style={{ objectFit: "cover", width: "100%", height: "100px", borderRadius: "16px", transform: "scale(0.95)" }} theme={props.theme} />
                  ) : (
                    <Cover alt={"Result game cover"} src={process.env.PUBLIC_URL + "/assets/placeholder-cover.png"} />
                  )}
                </CoverContainer>
                <Content>
                  <GameContent>

                    <GameHighlightWrapper>
                      <div>
                        <Game>
                          {props.game}
                        </Game>
                        <Developer>
                          {props.developer}
                        </Developer>
                      </div>
                      <PlatformsContainer>
                        {props.platforms && props.platforms.map((platform, i) => {
                          if (platform.platform_logo && i <= 6) {
                            return (
                              <Tooltip key={i} title={platform.name}>
                                <PlatformLogo alt={"platform logo"} src={`https://images.igdb.com/igdb/image/upload/t_logo_med/${platform.platform_logo.image_id}.png`} />
                              </Tooltip>
                            )
                          } else {
                            return null
                          }
                        })}
                      </PlatformsContainer>
                    </GameHighlightWrapper>

                    {props.date && (
                      <DateCenter>
                        <DateContainer>
                          <div style={{ marginRight: "4px" }}>{props.date.date}</div>
                          {props.date.elapsedTime && (
                            <div>({props.date.elapsedTime})</div>
                          )}
                        </DateContainer>
                      </DateCenter>
                    )}

                  </GameContent>

                  {/* <ContentCenter>
                    <RateContainer>

                      {!isNaN(props.rating) && (
                        <CircularProgressWithLabel value={props.rating} size={60} />
                      )}
                    </RateContainer>
                  </ContentCenter> */}
                </Content>
              </FlexFullWidthHeight>
              <DateMobileContainer>
                {props.date && (
                  <ContentCenter>
                    <DateContainer>
                      <div style={{ marginRight: "4px" }}>{props.date.date}</div>
                      {props.date.elapsedTime && (
                        <div>({props.date.elapsedTime})</div>
                      )}
                    </DateContainer>
                  </ContentCenter>
                )}
              </DateMobileContainer>
            </Wrapper>
            <ContentCenter>
              <RateContainer>

                {!isNaN(props.rating) && (
                  <CircularProgressWithLabel value={props.rating} size={60} />
                )}
              </RateContainer>
            </ContentCenter>
          </RowContainer>

        </RippleEffect>

      </Container>
    )
  }

  if (props.loading === true) {
    return (
      <Container theme={props.theme}>
        <Skeleton animation="wave" variant="rect" height="100%" width="100%" style={{ borderRadius: "16px" }} />
      </Container>
    )
  } else if (!props.genres && !props.screenshots) {
    return CardContent()
  } else {
    return (
      <HoverInfo title={
        <FloatingGameDetails title={props.game} date={props.date?.date} elapsedTime={props.date?.elapsedTime} screenshots={props.screenshots} genres={props.genres} theme={props.theme} />
      } placement={"right"} TransitionComponent={Fade} arrow={true}>
        {CardContent()}
      </HoverInfo>
    );
  }
};

SearchResultCard.propTypes = {
  id: PropTypes.number,
  game: PropTypes.string,
  developer: PropTypes.string,
  platforms: PropTypes.array,
  date: PropTypes.object,
  rating: PropTypes.number,
  coverId: PropTypes.string,
  screenshots: PropTypes.array,
  genres: PropTypes.array,
  loading: PropTypes.bool,
  theme: PropTypes.string.isRequired
};

export default withRouter(SearchResultCard);
