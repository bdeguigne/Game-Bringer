import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { appColors } from "../utils/styles";
import { Button } from "@material-ui/core";
import CircularProgressWithLabel from "./CircularProgressWithLabel";
import CrossFadeImages from "./CrossFadeImages";
import { DateRange } from "@material-ui/icons";
import GameShowcaseSkeleton from "./GameShowcaseSkeleton";
import useWindowDimensions from "../utils/useWindowDimensions";
import { withRouter } from "react-router-dom"
import { compose } from "redux";
import { connect } from "react-redux";
import { setLinkFilters } from '../redux/actions/filtersActions'

export const FullWidthContainer = styled.div`
  display: flex;
  width: 988px;
  max-width: 100%;
  position: relative;
`

export const Container = styled.div`
  width: 100%;
  height: 620px;
  border-radius: 32px;
  background: ${props => appColors[props.theme].backgroundContrast};
  display: flex;
  flex-direction: column;

  @media only screen and (min-width: 768px) {
    flex-direction: row;
    height: 450px;
  }
`

export const ScreenshotContainer = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 0;
  position: relative;

  @media only screen and (min-width: 768px) {
    width: 50%;
    height: 100%;
    border-radius: 32px;
  }

`


const Title = styled.h3`
  font-size: 21px;
`

export const GameInfoContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  border-radius: 32px;

  @media only screen and (min-width: 768px) {
    width: 50%;
  }
`

const GameInfoPadding = styled.div`
  padding: 24px;
  white-space: pre-wrap;
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

const GenresContainer = styled.div`
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
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  @media only screen and (min-width: 768px) {
    -webkit-line-clamp: 6;
  }
`

const SeeMoreContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const BottomDarker = styled.div`
  display: none;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 2;
  border-radius: 32px;
  background: linear-gradient( to bottom,rgba(0,0,0,0) 70%,rgba(0,0,0,0.7));

  @media only screen and (min-width: 768px) {
    display: block;
  }
`

const Icon = styled(DateRange)`
  margin-right: 8px;
`

const PlaceholderImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 32px;
  object-fit: cover;
`

function GameShowcase(props) {
  const { width } = useWindowDimensions();

  function onLoad() {
    props.onLoad();
  }

  function seeMore() {
    let urlTitle = props.data.game.split(' ').join('_');
    props.history.push("/" + props.data.id + "/" + urlTitle);
  }

  function genreClick(id, name) {
    props.setLinkFilters({
      front: {genres: `${id}`},
      chip: {genres: name}
    })

    props.history.push("/search")
  }

  return (
    <>
      {props.isLoading ? (
        <GameShowcaseSkeleton theme={props.theme} />
      ) : (
        <FullWidthContainer>
          <Container theme={props.theme}>
            <ScreenshotContainer>
              {props.data.screenshots ? (
                <CrossFadeImages active={props.showed} style={{ borderRadius: width >= 738 ? 32 : 0 }} images={props.data.screenshots} prefixUrl={"https://images.igdb.com/igdb/image/upload/t_screenshot_huge/"} interval={3000} onLoad={onLoad} theme={props.theme} />
              ) : (
                <PlaceholderImage src={process.env.PUBLIC_URL + "/assets/placeholder-big.png"} alt="Placeholder" />
              )}
              {props.darkerImage && (
                <BottomDarker />
              )}
            </ScreenshotContainer>

            <GameInfoContainer>
              <div>
                <GameInfoPadding>
                  <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%" }}>
                    <div>
                      <Space height={12}>
                        <Title>{props.data.game}</Title>
                      </Space>
                      {props.data.releaseDate && (
                        <Space height={16}>
                          <DateContainer>
                            <Icon size="small" />
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
                                  <GenreButton key={i} color="secondary" size="small" onClick={() => genreClick(genre.id, genre.name)}>{genre.name}</GenreButton>
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
                    </div>
                    <SeeMoreContainer>
                      <Button color="primary" onClick={seeMore}>See more</Button>
                      <CircularProgressWithLabel value={props.data.rating} size={60} />
                    </SeeMoreContainer>
                  </div>


                </GameInfoPadding>
              </div>
              {/* <BottomContainer>
                <SeeAllGamesButton color="secondary" theme={props.theme}>
                  See all games
                                </SeeAllGamesButton>
              </BottomContainer> */}
            </GameInfoContainer>
          </Container>
        </FullWidthContainer>
      )}
    </>
  );
}

GameShowcase.defaultProps = {
  darkerImage: false,
  isLoading: true,
  showed: false
}

GameShowcase.propTypes = {
  data: PropTypes.object,
  darkerImage: PropTypes.bool,
  isLoading: PropTypes.bool,
  onLoad: PropTypes.func,
  showed: PropTypes.bool,
  theme: PropTypes.string.isRequired
}

const actionCreator = {
  setLinkFilters
}

function mapStateToProps(state) {
  return {
  }
}


export default compose(
  withRouter,
  connect(mapStateToProps, actionCreator)
)(GameShowcase)