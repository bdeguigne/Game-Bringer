import React from 'react'
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { appColors } from '../../utils/styles';

const Banner = styled.img`
    position: absolute;
    top: 0;
    left: 0;
    height: 442px;
    width: 100%;
    object-fit: cover;
    filter: blur(8px);
    user-select: none;
    z-index: -1;
`

const Content = styled.div`
    padding-top: 442px;
    height: 108px;
`

const HeaderContainer = styled.div`
    top: -248px;
    position: relative;
    display: flex;
`

const CoverImg = styled.img`
    margin-right: 16px;
    border-radius: 8px;
    box-shadow: ${props => `0px 0px 30px 0px ${appColors[props.theme].secondaryTransparent}, inset 0px 0px 41px 5px rgba(255, 255, 255, 0.4)`};
    filter: drop-shadow(0px 0px 4px #FFFFFF);
    border: 1.5px solid #FFFFFF;
`

const GameTitleContainer = styled.div`
    width: 100%;
    height: 258px;
    position: relative;
`

const GameTitle = styled.h1`
    font-size: 40px;
    font-weight: bold;
    text-shadow: 0 1px 1px rgb(0 0 0 / 40%);
`

const DateHeading = styled.h2`
    margin-top: 16px;
    font-size: 25px;
    color: #E7E7E7;
    margin-right: 8px;
    text-shadow: 0 1px 1px rgb(0 0 0 / 40%);
`

const DateContainer = styled.div`
    display: flex;
    font-weight: 600;
`

const CompanyHeading = styled.h3`
    margin-top: 16px;
    font-size: 25px;
    font-style: italic;
    font-weight: normal;
    text-shadow: 0 1px 1px rgb(0 0 0 / 40%);
`

const TitleWrapper = styled.div`

    position: absolute;
    bottom: 0px;
    z-index: 2;
    width: 100%;
    min-height: 210px;
`

const FullWidth = styled.div`
    width: 100%;
    
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
                        <GameTitleContainer>
                            <TitleWrapper>

                                <GameTitle>{props.game.name}</GameTitle>
                                {props.game.releaseDate && (
                                    <DateContainer>
                                        {props.game.releaseDate.date && (
                                            <DateHeading>{props.game.releaseDate.date}</DateHeading>
                                        )}
                                        {props.game.releaseDate.elapsedTime && (
                                            <DateHeading>({props.game.releaseDate.elapsedTime})</DateHeading>
                                        )}
                                    </DateContainer>
                                )}
                                {props.game.company?.name && (
                                    <CompanyHeading>{props.game.company.name}</CompanyHeading>
                                )}
                            </TitleWrapper>
                        </GameTitleContainer>


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

