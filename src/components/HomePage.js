import React, { useEffect, useState } from "react"
import ShowCarousel from "./ShowCarousel";
import TopRatedGames from "./TopRatedGames";
import { connect } from "react-redux";
import styled from 'styled-components';
import { Padding, SectionTitle, MainContent } from '../utils/styles';
import OtherGamesSlider from "./OtherGamesSlider";
import { setRouteIndex, setIsErrorOccurred } from '../redux/actions/UIActions';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

const TitleContainer = styled(Padding)`
    margin-top: 16px;
    padding-top: 34px;
    font-size: 21px;
`;

const Title = styled(SectionTitle)`
  margin-bottom: 0;
`

const HomePage = (props) => {
    const [openSnackBar, setOpenSnackBar] = useState(false);

    useEffect(() => {
        props.setRouteIndex(0);
        console.log("OKOKAOAK", props.anticipatedGames)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.anticipatedGames]);

    useEffect(() => {
        if (props.isErrorOccurred) {
            console.log("ERROR SHOW SNACKBAR", props.isErrorOccurred)
            setOpenSnackBar(props.isErrorOccurred)
        }
    }, [props.isErrorOccurred])

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        props.setIsErrorOccurred(false);

        setOpenSnackBar(false);
    };

    return (
        <MainContent>
            <Snackbar open={openSnackBar} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: "top", horizontal: "right" }}>
                <Alert onClose={handleClose} severity="error">
                    Sorry, a error occured, please try again.
                </Alert>
            </Snackbar>

            <TitleContainer>
                <Title>Popular games right now</Title>
            </TitleContainer>

            <div>
                <ShowCarousel data={props.popularGames} theme={props.theme} />
            </div>

            <Padding>
                <TopRatedGames />
            </Padding>

            <Padding>
                <OtherGamesSlider sliderName={"recently-released"} title={"Recently released"} data={props.recentlyReleasedGames} theme={props.theme}/>
            </Padding>

            <Padding>
                <OtherGamesSlider sliderName={"coming-soon"} title={"Coming Soon"} data={props.comingSoonGames} theme={props.theme} />
            </Padding>

            <Padding>
                <OtherGamesSlider sliderName={"most-anticipated-games"} title={"Most anticipated games"} data={props.anticipatedGames} theme={props.theme} />
            </Padding>
        </MainContent>
    )
}

const actionCreators = {
    setRouteIndex,
    setIsErrorOccurred
}

function mapStateToProps(state) {
    return {
        popularGames: state.homePageRequests.popularGames,
        anticipatedGames: state.homePageRequests.anticipatedGames,
        recentlyReleasedGames: state.homePageRequests.recentlyReleasedGames,
        comingSoonGames: state.homePageRequests.comingSoonGames,
        bestRatedGames: state.homePageRequests.bestRatedGamesThisMonth,
        isErrorOccurred: state.uiReducer.isErrorOccurred,
        theme: state.uiReducer.theme
    }
}

const connectedHomePage = connect(mapStateToProps, actionCreators)(HomePage);

export default connectedHomePage;