import React, {useState} from "react"
import { IconButton, InputBase } from "@material-ui/core"
import { SearchOutlined } from "@material-ui/icons";
import styled from 'styled-components';
import {withRouter} from "react-router-dom";

const Icon = styled(SearchOutlined)`
  color: white;
`
const Input = styled(InputBase)`
  margin-left: 8px;
`

function SearchBar(props) {
    const [inputValue, setInputValue] = useState("");
    const inputRef = React.useRef();

    const submit = () => {
        if (inputValue !== "") {
            let value = inputValue.split(' ').join('+');
            props.history.push(`/search/?term=${value}`);
        }
    }

    //Handle "Enter" Key
    const onKeyPressed = (evt) => {
        if (evt.key === "Enter") {
            submit();
            evt.preventDefault();
        }
    }

    return (
        <div>
            <IconButton onClick={submit} type="submit">
                <Icon/>
            </IconButton>
            <Input
                inputRef={inputRef}
                placeholder="Search Everything"
                onChange={(evt) => setInputValue(evt.target.value)}
                onKeyPress={onKeyPressed}
            />
        </div>
    )
}

export default withRouter(SearchBar);