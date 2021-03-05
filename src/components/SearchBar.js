import React, { useState } from "react"
import { IconButton, InputBase } from "@material-ui/core"
import { SearchOutlined } from "@material-ui/icons";
import styled from 'styled-components';
import { withRouter } from "react-router-dom";
import PropTypes from 'prop-types';

const SearchBarContainer = styled.div`
    display: ${props => props.isPopover ? "block" : "none"};

    @media only screen and (min-width: 768px) {
        display: block;
    }
`

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
        <SearchBarContainer isPopover={props.isPopover}>
            <IconButton onClick={submit} type="submit">
                <Icon />
            </IconButton>
            <Input
                inputRef={inputRef}
                placeholder="Search Everything"
                onChange={(evt) => setInputValue(evt.target.value)}
                onKeyPress={onKeyPressed}
            />
        </SearchBarContainer>
    )
}

SearchBar.propTypes = {
    isPopover: PropTypes.bool
}

export default withRouter(SearchBar);