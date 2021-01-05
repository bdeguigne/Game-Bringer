import React from "react"
import { IconButton, InputBase } from "@material-ui/core"
import { SearchOutlined } from "@material-ui/icons";
import styled from 'styled-components'

const Icon = styled(SearchOutlined)`
  color: white;
`
const Input = styled(InputBase)`
  margin-left: 8px;
`

function SearchBar() {
    const inputRef = React.useRef();

    return (
        <div>
            <IconButton onClick={() => inputRef.current.focus()} type="submit">
                <Icon/>
            </IconButton>
            <Input
                inputRef={inputRef}
                placeholder="Search Everything"
            />
        </div>
    )
}

export default SearchBar