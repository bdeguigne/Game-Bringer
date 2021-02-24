import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from "react-router-dom";
import { getGameDetails } from '../../redux/actions/gameDetailsActions';
import { MainContent, Padding } from '../../utils/styles'
import styled from 'styled-components';
import Header from './Header';
import GameDescription from './GameDescription';
import GameHighlight from './GameHighlight';
import ComplementaryInfo from './ComplementaryInfo'
import GameInfo from './GameInfo';

const Container = styled.div`
    position: relative;
`

const SpaceTop = styled.div`
    margin-top: ${props => props.value};
`

const ResponsiveLeftContainer = styled.div`
    width: 100%;
    margin-right: 0;
    @media only screen and (min-width: 992px) {
        width: 70%;
        margin-right: 12px;
    }
`

const ResponsiveFlex = styled.div`
    display: flex;
    flex-direction: column-reverse;
    width: 100%;
    
    @media only screen and (min-width: 992px) {
        flex-direction: row;
    }
`

const GameDetails = (props) => {
    let { id } = useParams();

    useEffect(() => {
        props.getGameDetails(id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Container>
            <MainContent>
                <Padding>
                    <Header game={props.game} theme={props.theme} />
                    <SpaceTop value={"64px"}>
                        <ResponsiveFlex>
                            <ResponsiveLeftContainer>
                                <GameHighlight screenshots={props.game.screenshots} videos={props.game.videos} />
                            </ResponsiveLeftContainer>

                            <ComplementaryInfo game={props.game} theme={props.theme} />
                        </ResponsiveFlex>
                    </SpaceTop>

                    <SpaceTop value={"16px"}>
                        <ResponsiveFlex>
                            <ResponsiveLeftContainer>
                                <GameDescription game={props.game}/>
                            </ResponsiveLeftContainer>

                            <GameInfo game={props.game} theme={props.theme}/>
                        </ResponsiveFlex>
                        
                    </SpaceTop>
                </Padding>
            </MainContent>
        </Container>
    );
}

const actionCreators = {
    getGameDetails
}

function mapStateToProps(state) {
    return {
        game: state.gameDetailsReducer.game,
        theme: state.uiReducer.theme
    };
}

export default connect(
    mapStateToProps, actionCreators
)(GameDetails);
