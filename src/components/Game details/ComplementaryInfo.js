import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { appColors, Center, Link } from '../../utils/styles';
import { Button } from '@material-ui/core';
import { socialIcons } from '../../utils/socialIcons';

const Container = styled.div`
    width: 100%;
    margin-bottom: 16px;
    /* border: 1px solid; */
`

const InfoContainer = styled.div`
    margin-bottom: 16px;
`

const Label = styled.span`
    font-weight: bold;
    text-transform: uppercase;
    font-size: 10px;
    color: #C4C4C4;
`

const Genre = styled(Button)`
  padding: 6px !important;
  height: 24px !important;
  margin-right: 8px !important;
  margin-bottom: 8px !important;
  font-size: 10px !important;
  border-radius: 6px !important;
`

const Separator = styled.hr`
    width: 80%;
    height: 1px;
    background-color: #3C3C3C;
    border: none;
`

const SocialContainer = styled.div`
    margin-top: 16px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    @media only screen and (min-width: 992px) {
        justify-content: inherit;
    }
    /* justify-content: center; */
`

const SocialIconContainer = styled.a`
    display: flex;
    align-items: center;
    font-size: 10px;
    margin: 4px;
    cursor: pointer;
    text-decoration: none;
    color: white;
    & > img {
        width: 21px;
        height: 21px;
        margin-right: 8px;
        border-radius: 4px;
    }
    transition: color 0.3s;

    &:hover {
        color: ${props => appColors[props.theme].primarySimple};
        text-decoration: underline;
    }
`

function ComplementaryInfo(props) {
    const [icons, setIcons] = useState([]);

    useEffect(() => {
        const iconsArray = [];
        if (props.game?.websites) {
            props.game.websites.forEach((site) => {
                socialIcons.forEach(icons => {
                    if (icons.id === site.category) {
                        iconsArray.push({ icon: icons.icon, name: icons.name , link: site.url});
                    }
                })
            })


            setIcons(iconsArray);
        }
    }, [props.game])
    return (
        <Container>
            {props.game.platforms && (
                <InfoContainer>
                    <p>
                        <Label>Platform{props.game.platforms.length > 1 && "s"} : </Label>
                        {props.game.platforms.map((platform, i) => {
                            return <Link theme={props.theme} href="#">{platform.name}{i !== (props.game.platforms.length - 1) && ", "}</Link>
                        })}
                    </p>
                </InfoContainer>
            )}

            {props.game.developers && (
                <InfoContainer>
                    <p>
                        <Label>Developer : </Label>
                        <Link theme={props.theme} href="#">{props.game.developers.name}</Link>
                    </p>
                </InfoContainer>
            )}

            {props.game.publishers && (
                <InfoContainer>
                    <p>
                        <Label>Publisher : </Label>
                        <Link theme={props.theme} href="#">{props.game.publishers.name}</Link>
                    </p>
                </InfoContainer>
            )}

            {props.game.genres && (
                <InfoContainer>
                    {props.game.genres.map((genre, index) => {
                        return <Genre key={index} size="small" color="secondary">{genre.name}</Genre>
                    })}
                </InfoContainer>
            )}

            <Center>
                <Separator></Separator>
            </Center>

            <SocialContainer>
                {icons && icons.map((icon) => {
                    return (
                        <SocialIconContainer theme={props.theme} href={icon.link} target="_blank">
                            <img src={icon.icon} alt="social icons" />
                            {icon.name}
                        </SocialIconContainer>
                    )
                })
                }
            </SocialContainer>
        </Container>
    )
}

ComplementaryInfo.propTypes = {
    game: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    theme: PropTypes.string
}

export default ComplementaryInfo

