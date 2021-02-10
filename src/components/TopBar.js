import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import { Tabs } from "@material-ui/core";
import styled from "styled-components";
import { appColors, Padding, topBarNeonBorder, topBarNeonBoxShadow, maxWidth } from "../utils/styles";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";

const Container = styled.div`
  min-height: 50px;
    //border-bottom: 1px solid ${appColors[700]};
  border-bottom: ${topBarNeonBorder};
  padding-top: 18px;
  padding-bottom: 18px;
 
  box-shadow: ${topBarNeonBoxShadow};
`;

const Center = styled.div`
  justify-content: space-between;
  display: flex;
  align-items: center;
  width: ${maxWidth};
  max-width: 100%;
  margin: 0 auto;
`

const Wrapper = styled(Padding)`
	display: flex;
	width: 100%;
	justify-content: space-between;
`

const RightLayout = styled.div`
  display: flex;
  //border: 1px solid white;
`;

const TabsIcon = styled.span`
  padding: 0 8px;
  margin-left: 12px;
  margin-right: 12px;
  cursor: pointer;
  width: 21px;
  font-size: 21px;
  
  transition: color, text-shadow 0.3s;
  color: ${props => props.active ? appColors.primarySimple : appColors.secondaryDarker}; 
  text-shadow: ${props => props.active ? `0 0 2px rgba(255, 255, 255, 0.25), 0 0 16px ${appColors.primarySimple};` : "none"}; ;
  
  &:hover {
    color: ${props => props.active ? appColors.primarySimple : appColors.secondary};
  }
`;

function TopBar(props) {
	const [tabValue, setTabValue] = useState(props.tabIndex);

	useEffect(() => {
		console.log("TAB TOTOTOABJZBAJEBABSBSB", props.tabIndex)
		setTabValue(props.tabIndex);
	}, [props]);



	function exploreIconClick() {
		setTabValue(0);
		props.history.push("/");
	}

	function searchIconClick() {
		setTabValue(1);
		props.history.push("/search");
	}

	function reviewsIconClick() {
		setTabValue(2);
	}

	return (
		<Container>
			<Center>
				<Wrapper>
					<SearchBar />
					<RightLayout>
						<Tabs value={tabValue}>
							<TabsIcon active={tabValue === 0} className={"icon-compass"} onClick={exploreIconClick} />
							<TabsIcon active={tabValue === 1} className={"icon-search-plus"} onClick={searchIconClick} />
							<TabsIcon active={tabValue === 2} className={"icon-thumbs-up"} onClick={reviewsIconClick} />
						</Tabs>
					</RightLayout>
				</Wrapper>
			</Center>
		</Container>
	)
}

function mapStateToProps(state) {
	return {
		tabIndex: state.uiReducer.index
	}
}

export default compose(
	withRouter,
	connect(mapStateToProps)
)(TopBar)