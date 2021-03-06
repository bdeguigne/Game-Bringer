import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { isEmpty, Link } from '../../utils/styles'
import { Skeleton } from '@material-ui/lab'
import { withRouter } from "react-router-dom"
import { compose } from "redux";
import { connect } from "react-redux";
import { setLinkFilters } from "../../redux/actions/filtersActions"

const Title = styled.div`
    font-size: 18px;
    font-weight: 500;
    text-transform: uppercase;
`

const Separator = styled.hr`
    margin-top: 4px;
    height: 1px;
    background-color: #454545;
    border: none;
    width: 70px;
`

const Paragraph = styled.div`
    font-size: 12px;
`

const SubTitle = styled.div`
    font-size: 12px;
    font-weight: bold;
    margin-top: 8px;
    margin-bottom: 8px;
`

const Container = styled.div`
    margin-top: 12px;
    margin-bottom: 12px;
`

const TextSkeleton = styled(Skeleton)`
    margin-top: 32px;
`


function GameInfo(props) {

    function linkClick(type, id, name) {
        props.setLinkFilters({
            front: { [type]: `${id}` },
            chip: { [type]: name }
        })

        props.history.push("/search")
    }

    return (
        <div>
            <Title>
                Information
            </Title>
            <Separator />
            {!isEmpty(props.game) ? props.game.releaseDates && (
                <Container>
                    <SubTitle>
                        Release dates:
                    </SubTitle>
                    <Paragraph>
                        {props.game.releaseDates.map((date, i) => {
                            return <div key={i}>{date.human} - <Link theme={props.theme} onClick={() => linkClick("platforms", date.platform.id, date.platform.name)}>{date.platform.name}</Link></div>
                        })}
                    </Paragraph>
                </Container>
            ) : (
                <Container>
                    <Skeleton variant="rect" width={120} height={15} />
                </Container>
            )}

            {!isEmpty(props.game) ? props.game.developers && (
                <Container>
                    <SubTitle>
                        Developer:
                    </SubTitle>
                    <Paragraph>
                        <Link theme={props.theme} onClick={() => linkClick("companies", props.game.developers.id, props.game.developers.name)}>{props.game.developers.name}</Link>
                    </Paragraph>
                </Container>
            ) : (
                <Container>
                    <Skeleton variant="rect" width={150} height={15} />
                </Container>
            )}

            {!isEmpty(props.game) ? props.game.publishers && (
                <Container>
                    <SubTitle>
                        Publisher:
                    </SubTitle>
                    <Paragraph>
                        <Link theme={props.theme} onClick={() => linkClick("companies", props.game.publishers.id, props.game.publishers.name)}>{props.game.publishers.name}</Link>
                    </Paragraph>
                </Container>
            ) : (
                <Container>
                    <Skeleton variant="rect" width={110} height={15} />
                </Container>
            )}

            {props.game.gameModes && (
                <Container>
                    <SubTitle>
                        Game modes:
                    </SubTitle>
                    <Paragraph>
                        {props.game.gameModes.map((mode, i) => {
                            return <div key={i}><Link theme={props.theme} onClick={() => linkClick("game_modes", mode.id, mode.name)}>{mode.name}</Link></div>
                        })}
                    </Paragraph>
                </Container>
            )}

            {props.game.genres && (
                <Container>
                    <SubTitle>
                        Genres:
                    </SubTitle>
                    <Paragraph>
                        {props.game.genres.map((genre, i) => {
                            return <div key={i}><Link  onClick={() => linkClick("genres", genre.id, genre.name)} theme={props.theme}>{genre.name}</Link></div>
                        })}
                    </Paragraph>
                </Container>
            )}

            {!isEmpty(props.game) ? props.game.themes && (
                <Container>
                    <SubTitle>
                        Themes:
                    </SubTitle>
                    <Paragraph>
                        {props.game.themes.map((theme, i) => {
                            return <div key={i}>{theme.name}</div>
                        })}
                    </Paragraph>
                </Container>
            ) : (
                <Container>
                    <TextSkeleton variant="rect" width={170} height={15} />
                </Container>
            )}

            {!isEmpty(props.game) ? props.game.playerPerspectives && (
                <Container>
                    <SubTitle>
                        Player perspectives:
                    </SubTitle>
                    <Paragraph>
                        {props.game.playerPerspectives.map((persp, i) => {
                            return <div key={i}><Link theme={props.theme} onClick={() => linkClick("player_perspectives", persp.id, persp.name)}>{persp.name}</Link></div>
                        })}
                    </Paragraph>
                </Container>
            ) : (
                <Container>
                    <Skeleton variant="rect" width={150} height={15} />
                </Container>
            )}


            {!isEmpty(props.game) ? props.game.gameEngines && (
                <Container>
                    <SubTitle>
                        Game engines:
                    </SubTitle>
                    <Paragraph>
                        {props.game.gameEngines.map((persp, i) => {
                            return <div key={i}><Link theme={props.theme} onClick={() => linkClick("game_engines", persp.id, persp.name)}>{persp.name}</Link></div>
                        })}
                    </Paragraph>
                </Container>
            ) : (
                <Container>
                    <Skeleton variant="rect" width={110} height={15} />
                </Container>
            )}


        </div>
    )
}

GameInfo.propTypes = {
    game: PropTypes.oneOfType([
        PropTypes.object, PropTypes.array
    ]),
    theme: PropTypes.string
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
)(GameInfo)

