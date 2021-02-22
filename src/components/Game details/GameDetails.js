import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from "react-router-dom";
import { getGameDetails } from '../../redux/actions/gameDetailsActions';
import { MainContent, Padding } from '../../utils/styles'
import styled from 'styled-components';
import Header from './Header';
import LeftContent from './LeftContent';
import RightContent from './RightContent';

const Container = styled.div`
    position: relative;
`

const Flex = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
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
                    <Flex>
                        <LeftContent game={props.game} theme={props.theme}/>
                        <RightContent game={props.game} theme={props.theme}/>
                    </Flex>
                    {/* <p>test</p> */}
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
