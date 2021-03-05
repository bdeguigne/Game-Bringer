import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from "react-router-dom";
import { getGameDetails, clearGameDetails } from '../../redux/actions/gameDetailsActions';
import { clearPrices } from '../../redux/actions/priceActions'
import { MainContent, Padding } from '../../utils/styles'
import styled from 'styled-components';
import Header from './Header';
import GameDescription from './GameDescription';
import GameHighlight from './GameHighlight';
import ComplementaryInfo from './ComplementaryInfo'
import GameInfo from './GameInfo';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

const Container = styled.div`
    position: relative;
`

const SpaceTop = styled.div`
    margin-top: ${props => props.mobile ? "32px" : props.value};

    @media only screen and (min-width: 768px) {
        margin-top: ${props => props.value};
    }
`

const ResponsiveLeftContainer = styled.div`
    width: 100%;
    margin-right: 0;
    @media only screen and (min-width: 992px) {
        min-width: ${props => props.hasScreenshots ? "70%" : 0};
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
    const [openSnackBar, setOpenSnackBar] = useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        props.setIsErrorOccurred(false);

        setOpenSnackBar(false);
    };



    useEffect(() => {
        props.getGameDetails(id);
        // eslint-disable-next-line react-hooks/exhaustive-deps

        return () => {
            props.clearGameDetails();
            props.clearPrices();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (props.isErrorOccurred) {
            console.log("ERROR SHOW SNACKBAR", props.isErrorOccurred)
            setOpenSnackBar(props.isErrorOccurred)
        }
    }, [props.isErrorOccurred])

    return (
        <Container>
            <MainContent>
                <Padding>
                    <Snackbar open={openSnackBar} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: "top", horizontal: "right" }}>
                        <Alert onClose={handleClose} severity="error">
                            Sorry, a error occured, please try again.
                        </Alert>
                    </Snackbar>
                    <Header game={props.game} theme={props.theme} />
                    <SpaceTop value={"64px"} mobile>
                        <ResponsiveFlex>
                            <ResponsiveLeftContainer hasScreenshots={props.game.screenshots}>
                                <GameHighlight screenshots={props.game.screenshots} videos={props.game.videos} />
                            </ResponsiveLeftContainer>

                            <ComplementaryInfo game={props.game} theme={props.theme} deals={props.deals} stores={props.stores} />
                        </ResponsiveFlex>
                    </SpaceTop>

                    <SpaceTop value={"16px"}>
                        <ResponsiveFlex>
                            <ResponsiveLeftContainer hasScreenshots={true}>
                                <GameDescription game={props.game} />
                            </ResponsiveLeftContainer>

                            <GameInfo game={props.game} theme={props.theme} />
                        </ResponsiveFlex>

                    </SpaceTop>
                </Padding>
            </MainContent>
        </Container>
    );
}

const actionCreators = {
    getGameDetails,
    clearGameDetails,
    clearPrices
}

function mapStateToProps(state) {
    return {
        game: state.gameDetailsReducer.game,
        theme: state.uiReducer.theme,
        deals: state.priceReducer.bestPrices,
        stores: state.priceReducer.stores,
        isErrorOccurred: state.uiReducer.isErrorOccurred,
    };
}

export default connect(
    mapStateToProps, actionCreators
)(GameDetails);
