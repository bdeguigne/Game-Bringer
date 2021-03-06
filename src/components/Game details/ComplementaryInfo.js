import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { appColors, Center, isEmpty, Link } from '../../utils/styles';
import { Button } from '@material-ui/core';
import { socialIcons } from '../../utils/socialIcons';
import Ratings from './Ratings';
import GameTitle from './GameTitle';
import { Skeleton } from '@material-ui/lab';
import Deals from './Deals';
import { withRouter } from "react-router-dom"
import { connect } from "react-redux";
import { compose } from "redux";
import { setLinkFilters } from '../../redux/actions/filtersActions'

const Container = styled.div`
    /* width: 100%; */
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

const RatingsContainer = styled.div`
    width: fit-content;
    margin: 0 auto;
`

const InfoWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;

    flex-direction: column-reverse;
    margin-bottom: 16px;

    @media only screen and (min-width: 576px) {
        flex-direction: row;
        align-items: flex-end;
    }
`

const SkeletonIcon = styled(Skeleton)`
    border-radius: 4px !important;
    margin-right: 8px;
`

const CheapShark = styled.span`
    font-size: 12px;
    color: #C4C4C4;
    margin-top: 16px;
`


function ComplementaryInfo(props) {
    const [icons, setIcons] = useState([]);

    function platformClick(type, id, name) {
        props.setLinkFilters({
            front: { [type]: `${id}` },
            chip: { [type]: name }
        })

        props.history.push("/search")
    }

    // function devClick(id, name) {
    //     props.setLinkFilters({
    //         front: { platforms: `${id}` },
    //         chip: { platforms: name }
    //     })

    //     props.history.push("/search")
    // }

    useEffect(() => {
        const iconsArray = [];
        if (props.game?.websites) {
            props.game.websites.forEach((site) => {
                socialIcons.forEach(icons => {
                    if (icons.id === site.category) {
                        iconsArray.push({ icon: icons.icon, name: icons.name, link: site.url });
                    }
                })
            })


            setIcons(iconsArray);
        }
    }, [props.game])
    return (
        <Container>
            <GameTitle game={props.game} mobile />

            <InfoWrapper>
                <div style={{ width: "100%", paddingRight: "8px" }}>

                    {isEmpty(props.game) && (
                        <>
                            <InfoContainer>
                                <Skeleton animation="wave" variant="pulse" width={250} height={200} />
                            </InfoContainer>
                        </>
                    )}

                    {props.game.platforms && (
                        <InfoContainer>
                            <p>
                                <Label>Platform{props.game.platforms.length > 1 && "s"} : </Label>
                                {props.game.platforms.map((platform, i) => {
                                    return <Link key={i} theme={props.theme} onClick={() => platformClick("platforms", platform.id, platform.name)}>{platform.name}{i !== (props.game.platforms.length - 1) && ", "}</Link>
                                })}
                            </p>
                        </InfoContainer>
                    )}

                    {props.game.developers && (
                        <InfoContainer>
                            <p>
                                <Label>Developer : </Label>
                                <Link theme={props.theme} onClick={() => platformClick("companies", props.game.developers.id, props.game.developers.name)}>{props.game.developers.name}</Link>
                            </p>
                        </InfoContainer>
                    )}

                    {props.game.publishers && (
                        <InfoContainer>
                            <p>
                                <Label>Publisher : </Label>
                                <Link theme={props.theme} onClick={() => platformClick("companies", props.game.publishers.id, props.game.publishers.name)}>{props.game.publishers.name}</Link>
                            </p>
                        </InfoContainer>
                    )}

                    {props.game.genres && (
                        <InfoContainer>
                            {props.game.genres.map((genre, index) => {
                                return <Genre key={index} size="small" color="secondary" onClick={() => platformClick("genres", genre.id, genre.name)}>{genre.name}</Genre>
                            })}
                        </InfoContainer>
                    )}

                    {!isEmpty(props.deals) && (
                        <InfoContainer>
                            <div style={{ height: 80 }}>
                                <Deals deals={props.deals} stores={props.stores} theme={props.theme} />
                            </div>
                            <CheapShark>Powered by <Link theme={props.theme} href="https://www.cheapshark.com/" target="_blank">Cheapshark</Link></CheapShark>
                        </InfoContainer>
                    )}
                </div>
                <RatingsContainer>
                    <Ratings game={props.game} theme={props.theme} mobile />
                </RatingsContainer>
            </InfoWrapper>


            <Center>
                <Separator></Separator>
            </Center>

            <SocialContainer>
                {!isEmpty(props.game) ? icons && icons.map((icon, i) => {
                    return (
                        <SocialIconContainer key={i} theme={props.theme} href={icon.link} target="_blank">
                            <img src={icon.icon} alt="social icons" />
                            {icon.name}
                        </SocialIconContainer>
                    )
                }) : (
                    <>
                        <SocialIconContainer theme={props.theme}>
                            <SkeletonIcon variant="rect" width={35} height={35} />
                            <SkeletonIcon variant="text" width={65} />
                        </SocialIconContainer>
                        <SocialIconContainer theme={props.theme}>
                            <SkeletonIcon variant="rect" width={35} height={35} />
                            <SkeletonIcon variant="text" width={65} />
                        </SocialIconContainer>
                        <SocialIconContainer theme={props.theme}>
                            <SkeletonIcon variant="rect" width={35} height={35} />
                            <SkeletonIcon variant="text" width={65} />
                        </SocialIconContainer>

                    </>
                )
                }
            </SocialContainer>

        </Container>
    )
}

ComplementaryInfo.propTypes = {
    game: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    theme: PropTypes.string,
    deals: PropTypes.array,
    stores: PropTypes.array
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

)(ComplementaryInfo)

