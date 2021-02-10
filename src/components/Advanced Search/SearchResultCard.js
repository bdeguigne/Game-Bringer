import React from 'react';
import PropTypes from 'prop-types';
import styled from "styled-components";
import { appColors, resultItemBoxShadow } from "../../utils/styles";
import { Tooltip, ButtonBase, Fade } from "@material-ui/core";
import { Skeleton } from '@material-ui/lab'
import FloatingGameDetails from "../FloatingGameDetails";
import CircularProgressWithLabel from "../CircularProgressWithLabel";
import ImageLoader from '../ImageLoader';

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
  position: relative;
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
  width: 50%;
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

const RateContainer = styled.div`
  width: 65px;
`

const DateContainer = styled.div`
  text-align: center;
  color: #B2B2B2;
  font-size: 14px;
`

const HoverInfo = styled(Tooltip)`
  padding: 0 !important;
`


const SearchResultCard = props => {

  const CardContent = () => {
    return (
      <Container>
        <RippleEffect>
          <CoverContainer>
            {props.coverId ? (
              // <Cover alt={"Result game cover"} src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${props.coverId}.jpg`} />
              <ImageLoader src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${props.coverId}.jpg`} style={{ objectFit: "cover", width: "100%", height: "100%", borderRadius: "16px", transform: "scale(0.95)" }} />
            ) : (
              <Cover alt={"Result game cover"} src={process.env.PUBLIC_URL + "/assets/placeholder-cover.png"} />
            )}
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
                {props.platforms && props.platforms.map((platform, i) => {
                  if (platform.platform_logo) {
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
            </LeftContent>

            {props.date && (
              <ContentCenter>
                <DateContainer>
                  <div>{props.date.date}</div>
                  {props.date.elapsedTime && (
                    <div>({props.date.elapsedTime})</div>
                  )}
                </DateContainer>
              </ContentCenter>
            )}

            <ContentCenter>
              <RateContainer>

                {!isNaN(props.rating) && (
                  <CircularProgressWithLabel value={props.rating} size={60} />
                )}
              </RateContainer>
            </ContentCenter>
          </Content>

        </RippleEffect>
      </Container>
    )
  }

  if (props.loading === true) {
    return (
      <Container>
        <Skeleton animation="wave" variant="rect" height="100%" width="100%" style={{ borderRadius: "16px" }} />
      </Container>
    )
  } else if (!props.genres && !props.screenshots) {
    return CardContent()
  } else {
    return (
      <HoverInfo title={
        <FloatingGameDetails title={props.game} date={props.date?.date} elapsedTime={props.date?.elapsedTime} screenshots={props.screenshots} genres={props.genres} />
      } placement={"right"} TransitionComponent={Fade} arrow={true}>
        {CardContent()}
      </HoverInfo>
    );
  }
};

SearchResultCard.propTypes = {
  game: PropTypes.string,
  developer: PropTypes.string,
  platforms: PropTypes.array,
  date: PropTypes.object,
  rating: PropTypes.number,
  coverId: PropTypes.string,
  screenshots: PropTypes.array,
  genres: PropTypes.array,
  loading: PropTypes.bool
};

export default SearchResultCard;
