import React, { useState } from 'react';
import styled from 'styled-components';
import {
    sideNavWidth,
    appColors,
    sideNavNeonBorder,
    sideNavNeonBoxShadowSoft,
    sideNavPaddingLeft
} from "../utils/styles";
import { IconButton } from '@material-ui/core';
import { Menu } from "@material-ui/icons";
import { connect } from "react-redux";
import { expandMenuState } from '../redux/actions/UIActions';
import { Tabs, Tab, Tooltip } from "@material-ui/core";
import {ExploreOutlined, ThumbUpAltOutlined, Search} from "@material-ui/icons"

const NavContainer = styled.div`
  height: 100%;
  width: ${props => props.expanded ? sideNavWidth.expanded : sideNavWidth.normal};
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: ${appColors.backgroundColor};
    //border-right: 1px solid ${appColors[700]};
  //border-right: ${sideNavNeonBorder};
  box-shadow: ${sideNavNeonBoxShadowSoft};
  //box-shadow: 2px 0px 1px 0px rgba(0,0,0,0.2);
  overflow-x: hidden;
  transition: 0.5s;
  padding-top: 18px;
`

const MenuIcon = styled(IconButton)`
  margin-left: 12px !important;
`

const VerticalTab = styled(Tab)`
    //width: ${props => props.expanded ? "160px" : "50px"};
  min-width: initial !important;
  transition: 0.5s;
`

function SideNav({ onExpand, expandMenuState }) {
    const [expanded, setExpanded] = useState(false);
    const [tabsIndex, setTabsIndex] = useState(0);

    const tabsOnChange = (event, index) => {
        setTabsIndex(index);
    }

    function expandMenu() {
        setExpanded(!expanded);
        expandMenuState();
        if (onExpand) {
            onExpand(!expanded);
        }
    }

    return (
        <NavContainer expanded={expanded}>
            <MenuIcon onClick={expandMenu}>
                <Menu />
            </MenuIcon>
            {expanded ? (
                <Tabs
                    value={tabsIndex}
                    onChange={tabsOnChange}
                    aria-label="sidenav tabs"
                    orientation="vertical"
                >
                    <VerticalTab expanded={expanded} label="Discover" icon={<ExploreOutlined />} className={expanded ? "sideNav-tab" : "sideNav-tab icon"} />
                    <VerticalTab expanded={expanded} label="Reviews" icon={<ThumbUpAltOutlined />}  className={expanded ? "sideNav-tab" : "sideNav-tab icon"}/>
                    <VerticalTab expanded={expanded} label="Search" icon={<Search />}  className={expanded ? "sideNav-tab" : "sideNav-tab icon"}/>
                </Tabs>
            ) : (
                <Tabs
                    value={tabsIndex}
                    onChange={tabsOnChange}
                    aria-label="sidenav tabs"
                    orientation="vertical"
                >
                    <Tooltip title="Discover" placement="right" className="sideNav-tooltip">
                        <VerticalTab expanded={expanded} label="Discover" icon={<ExploreOutlined />} className={expanded ? "sideNav-tab" : "sideNav-tab icon"} />
                    </Tooltip>
                    <Tooltip title="Reviews" placement="right" className="sideNav-tooltip">
                        <VerticalTab expanded={expanded} label="Reviews" icon={<ThumbUpAltOutlined />}  className={expanded ? "sideNav-tab" : "sideNav-tab icon"}/>
                    </Tooltip>
                    <Tooltip title="Search" placement="right" className="sideNav-tooltip">
                        <VerticalTab expanded={expanded} label="Search" icon={<Search />}  className={expanded ? "sideNav-tab" : "sideNav-tab icon"}/>
                    </Tooltip>
                </Tabs>

            )}
        </NavContainer>
    )
}

const actionCreators = {
    expandMenuState
}

function mapStateToProps(state) {
    return {}
}

const connectedSideNav = connect(mapStateToProps, actionCreators)(SideNav);

export default connectedSideNav;