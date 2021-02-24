import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { appColors, Link } from '../../utils/styles'

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

const Paragraph = styled.p`
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

function GameInfo(props) {
    return (
        <div>
            <Title>
                Information
            </Title>
            <Separator />
            {props.game.releaseDates && (
                <Container>
                    <SubTitle>
                        Release dates:
                    </SubTitle>
                    <Paragraph>
                        {props.game.releaseDates.map(date => {
                            return <p>{date.human} - <Link theme={props.theme}>{date.platform.name}</Link></p>
                        })}
                    </Paragraph>
                </Container>
            )}

            {props.game.developers && (
                <Container>
                    <SubTitle>
                        Developer:
                    </SubTitle>
                    <Paragraph>
                        <Link theme={props.theme}>{props.game.developers.name}</Link>
                    </Paragraph>
                </Container>
            )}

            {props.game.publishers && (
                <Container>
                    <SubTitle>
                        Publisher:
                    </SubTitle>
                    <Paragraph>
                        <Link theme={props.theme}>{props.game.publishers.name}</Link>
                    </Paragraph>
                </Container>
            )}

            {props.game.gameModes && (
                <Container>
                    <SubTitle>
                        Game modes:
                    </SubTitle>
                    <Paragraph>
                        {props.game.gameModes.map(mode => {
                            return <p><Link theme={props.theme}>{mode.name}</Link></p>
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
                        {props.game.genres.map(genre => {
                            return <p><Link theme={props.theme}>{genre.name}</Link></p>
                        })}
                    </Paragraph>
                </Container>
            )}

            {props.game.themes && (
                <Container>
                    <SubTitle>
                        Themes:
                    </SubTitle>
                    <Paragraph>
                        {props.game.themes.map(theme => {
                            return <p><Link theme={props.theme}>{theme.name}</Link></p>
                        })}
                    </Paragraph>
                </Container>
            )}

            {props.game.playerPerspectives && (
                <Container>
                    <SubTitle>
                        Player perspectives:
                    </SubTitle>
                    <Paragraph>
                        {props.game.playerPerspectives.map(persp => {
                            return <p><Link theme={props.theme}>{persp.name}</Link></p>
                        })}
                    </Paragraph>
                </Container>
            )}


            {props.game.gameEngines && (
                <Container>
                    <SubTitle>
                        Game engines:
                    </SubTitle>
                    <Paragraph>
                        {props.game.gameEngines.map(persp => {
                            return <p><Link theme={props.theme}>{persp.name}</Link></p>
                        })}
                    </Paragraph>
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

export default GameInfo

