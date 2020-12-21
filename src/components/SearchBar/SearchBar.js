import React from "react"
import { IconButton, InputBase } from "@material-ui/core"
import { SearchOutlined } from "@material-ui/icons"

import "./SearchBar.css"

function SearchBar() {
    const inputRef = React.useRef();

    return (
        <div>
            <IconButton onClick={() => inputRef.current.focus()} type="submit">
                <SearchOutlined className="searchBar__icon" />
            </IconButton>
            <InputBase
                inputRef={inputRef}
                className="searchBar__input"
                placeholder="Search Everything"
            />
        </div>
    )
}

export default SearchBar