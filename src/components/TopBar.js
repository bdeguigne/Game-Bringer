import React from "react";
import SearchBar from "./SearchBar";
import { Avatar, IconButton, Tooltip } from "@material-ui/core";
import { NotificationsOutlined } from "@material-ui/icons";
import styled from "styled-components";
import {appColors, Padding, topBarNeonBorder, topBarNeonBoxShadow, maxWidth} from "../utils/styles";

const Container = styled(Padding)`
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

const RightLayout = styled.div`
  display: flex;
`;

const Icon = styled(IconButton)`
  margin-left: 16px !important;
`;

function TopBar() {
    return (
        <Container>
            <Center>
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
            </Center>
        </Container>
    )
}

export default TopBar;