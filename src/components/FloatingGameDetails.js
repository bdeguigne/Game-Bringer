import React from 'react';
import PropTypes from 'prop-types';
import styled from "styled-components";
import CrossFadeImages from "./CrossFadeImages";
import { Button } from "@material-ui/core";
import { DateRange } from "@material-ui/icons";

const Container = styled.div`
  padding: 16px;
`

const Title = styled.h4`
  font-size: 15px;
  margin-bottom: 4px;
`

const Icon = styled(DateRange)`
  margin-right: 4px;
  width: 16px !important;
  color: #BDBDBD;
`

const Date = styled.span`
  font-size: 10px;
  color: #BDBDBD;
`

const SumaryContainer = styled.div`
  margin-top: 8px;
  font-size: 11px;
  text-overflow: ellipsis;
  max-height: 126px;
  display: -webkit-box;
  -webkit-line-clamp: 6;
  -webkit-box-orient: vertical;
  overflow: hidden;
`

const ScreenshotContainer = styled.div`
  margin-top: 4px;
  margin-bottom: 4px;
  width: 268px;
  height: 153px;
  position: relative;
`

const DateContainer = styled.div`
  display: flex;
  align-items: center;
`

const GenreContainer = styled.div`
  margin-top: 8px;
  display: flex;
  flex-wrap: wrap;
  height: 30px;
  overflow: hidden;
`

const GenreButton = styled(Button)`
  padding: 4px 4px !important;
  font-size: 0.6rem !important;
  height: fit-content !important;
  border-radius: 4px !important;
  margin-right: 8px !important;
  margin-bottom: 8px !important;
`


const FloatingGameDetails = props => {
  return (
    <Container>
      <Title>{props.title}</Title>
      {(props.date || props.elapsedTime) && (
        <DateContainer>
          <Icon size={"small"} />
          {props.elapsedTime ? (
            <Date>{`${props.date} (${props.elapsedTime})`}</Date>
          ) : (
            <Date>{props.date}</Date>
          )}
        </DateContainer>
      )}
      {props.screenshots && (
        <ScreenshotContainer>
          <CrossFadeImages
            style={{ borderRadius: "8px" }}
            active={true} interval={1500}
            images={props.screenshots}
            prefixUrl={"https://images.igdb.com/igdb/image/upload/t_screenshot_med/"}
            skeletonOnLoadingImages={true}
            elevation={false}
          />
        </ScreenshotContainer>
      )}
      {props.genres && (
        <GenreContainer>
          {props.genres.map((genre, i) => {
            if (i < 3) {
              return <GenreButton key={i} color="secondary" size="small">{genre.name}</GenreButton>
            } else {
              return null
            }
          })}
        </GenreContainer>
      )}
      {props.summary && (
        <SumaryContainer>
          <p>{props.summary}</p>
        </SumaryContainer>
      )}
    </Container>
  );
};

FloatingGameDetails.propTypes = {
  title: PropTypes.string,
  date: PropTypes.string,
  elapsedTime: PropTypes.string,
  screenshots: PropTypes.array,
  genres: PropTypes.array,
  summary: PropTypes.string
};

export default FloatingGameDetails;
