import React from "react";
import SearchBar from "./SearchBar";
import { Avatar, IconButton, Tooltip } from "@material-ui/core";
import { NotificationsOutlined } from "@material-ui/icons";
import styled from "styled-components";
import {appColors, Padding, topBarNeonBorder, topBarNeonBoxShadow} from "../utils/styles";

const Container = styled(Padding)`
    height: 50px;
    //border-bottom: 1px solid ${appColors[700]};
    border-bottom: ${topBarNeonBorder};
    padding-top: 18px;
    padding-bottom: 18px;
    display: flex;
    align-items: center;
    box-shadow: ${topBarNeonBoxShadow};
    justify-content: space-between;
`;

const RightLayout = styled.div`
    display: flex;
`;

const Icon = styled(IconButton)`
    margin-left: 16px !important;
`;

function TopBar() {
    return (
        <Container>
            <SearchBar />
            <RightLayout>
                <Tooltip title="Notifications">
                    <Icon size="medium">
                        <NotificationsOutlined />
                    </Icon>
                </Tooltip>
                    <Icon size="small">
                        <Avatar alt="user" src="https://avatars.dicebear.com/4.5/api/bottts/abcdef.svg" />
                    </Icon>
            </RightLayout>
        </Container>
    )
}

export default TopBar;