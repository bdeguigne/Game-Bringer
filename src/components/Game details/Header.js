import React from 'react'
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { appColors } from '../../utils/styles';
import Ratings from './Ratings';
import GameTitle from './GameTitle';

const Banner = styled.img`
    position: absolute;
    top: 0;
    left: 0;
    height: 281px;
    width: 100%;
    object-fit: cover;
    filter: blur(8px);
    user-select: none;
    z-index: -1;

    @media only screen and (min-width: 768px) {
        height: 442px;
    }
`

const Content = styled.div`
    padding-top: 281px;
    height: 108px;

    @media only screen and (min-width: 768px) {
        padding-top: 442px;
    }
`

const HeaderContainer = styled.div`
    width: fit-content;
    top: -248px;
    position: relative;
    display: flex;
    margin: 0 auto;

    @media only screen and (min-width: 576px) {
        width: 100%;
        margin: 0;
    }
`

const CoverImg = styled.img`
    margin-right: 16px;
    border-radius: 8px;
    box-shadow: ${props => `0px 0px 30px 0px ${appColors[props.theme].secondaryTransparent}, inset 0px 0px 41px 5px rgba(255, 255, 255, 0.4)`};
    filter: drop-shadow(0px 0px 4px #FFFFFF);
    border: 1.5px solid #FFFFFF;
`


const FullWidth = styled.div`
    width: 100%;
    display: flex;
`



function Header(props) {
    return (
        <div>
            <Banner src={"https://images.igdb.com/igdb/image/upload/t_screenshot_big/" + props.game.banner + ".jpg"} alt="banner" />

            <Content>
                <HeaderContainer>
                    {/* <Flex> */}
                    <CoverImg src={"https://images.igdb.com/igdb/image/upload/t_cover_big/" + props.game.coverId + ".jpg"} alt="cover" theme={props.theme} />
                    <FullWidth>
                        <GameTitle game={props.game} />

                        <Ratings game={props.game} theme={props.theme} />
                    </FullWidth>
                    {/* </Flex> */}
                </HeaderContainer>
            </Content>
        </div>
    )
}

Header.propTypes = {
    game: PropTypes.oneOfType([
        PropTypes.object, PropTypes.array
    ]),
    theme: PropTypes.string
}

export default Header

