import React from "react";
import "./Topbar.css";
import SearchBar from "../components/SearchBar/SearchBar";
import { Avatar, IconButton, Tooltip } from "@material-ui/core";
import { NotificationsOutlined } from "@material-ui/icons";

import "./Topbar.css"

function Topbar() {
    return (
        <div className="topbar">
            <SearchBar />
            <div className="topbar__rightLayout">
                <Tooltip title="Toggle notifications panel">
                    <IconButton size="medium" className="topbar__iconButton">
                        <NotificationsOutlined/>
                    </IconButton>
                </Tooltip>
                <IconButton size="small" className="topbar__iconButton">
                    <Avatar alt="user" src="https://avatars.dicebear.com/4.5/api/bottts/abcdef.svg" />
                </IconButton>

            </div>
        </div>
    )
}

export default Topbar;