import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import { Popover, Tabs, Tooltip } from "@material-ui/core";
import styled from "styled-components";
import { appColors, Padding, topBarNeonBorder, maxWidth } from "../utils/styles";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import BrushIcon from '@material-ui/icons/Brush';
import { setTheme } from '../redux/actions/UIActions';
import ThemePopover from "./Advanced Search/ThemePopover";

const Container = styled.div`
  min-height: 50px;
    //border-bottom: 1px solid ${appColors[700]};
  border-bottom: ${topBarNeonBorder};
  padding-top: 18px;
  padding-bottom: 18px;
 
  box-shadow: ${props => `0 0 0.5rem #fff, 0 0 2rem -21px ${appColors[props.theme].secondary}, inset 0px -20px 2rem -24px ${appColors[props.theme].secondary}, 0 0 4rem -15px ${appColors[props.theme].secondary}`};
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
  color: ${props => props.active ? appColors[props.theme].primarySimple : appColors[props.theme].secondaryDarker}; 
  text-shadow: ${props => props.active ? `0 0 2px rgba(255, 255, 255, 0.25), 0 0 16px ${appColors[props.theme].primarySimple};` : "none"}; ;
  
  &:hover {
    color: ${props => props.active ? appColors[props.theme].primarySimple : appColors[props.theme].secondary};
  }
`;

function TopBar(props) {
	const [tabValue, setTabValue] = useState(props.tabIndex);
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);

	useEffect(() => {
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

	function themeIconClick(event) {
		setAnchorEl(event.currentTarget);
	}

	function popoverOnClose() {
		setAnchorEl(null);
	}

	function onChangeThemeClick(theme) {
		props.setTheme(theme);
	}

	return (
		<Container theme={props.theme}>
			<Center>
				<Wrapper>
					<SearchBar />
					<RightLayout>
						<Tabs value={tabValue}>
							<Tooltip title={"Explore"}>
								<TabsIcon active={tabValue === 0} className={"icon-compass"} onClick={exploreIconClick} theme={props.theme} />
							</Tooltip>
							<Tooltip title={"Advanced search"}>
								<TabsIcon active={tabValue === 1} className={"icon-search-plus"} onClick={searchIconClick} theme={props.theme} />
							</Tooltip>
							<Tooltip title={"Change theme"}>
								<TabsIcon active={open} className={"icon-paint"} onClick={themeIconClick} theme={props.theme} aria-describedby={"toggle-theme"}/>
							</Tooltip>
							<Popover
								id={"toggle-theme"}
								open={open}
								anchorEl={anchorEl}
								onClose={popoverOnClose}
								anchorOrigin={{
									vertical: 'bottom',
									horizontal: 'left',
								}}
								transformOrigin={{
									vertical: 'top',
									horizontal: 'center',
								}}>
									<ThemePopover onChangeTheme={onChangeThemeClick} theme={props.theme} />
							</Popover>
						</Tabs>
					</RightLayout>
				</Wrapper>
			</Center>
		</Container>
	)
}

const actionCreator = {
	setTheme
}

function mapStateToProps(state) {
	return {
		tabIndex: state.uiReducer.index,
		theme: state.uiReducer.theme
	}
}

export default compose(
	withRouter,
	connect(mapStateToProps, actionCreator)
)(TopBar)