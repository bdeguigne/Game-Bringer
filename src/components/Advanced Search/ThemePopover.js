import { ButtonBase } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { appColors } from '../../utils/styles';

const Container = styled.div`
    padding: 12px 8px;
    display: flex;
`

const RoundedColor = styled.div`
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background-color: ${props => props.color};
    margin-right: 8px;
`

const SelectThemeContainer = styled.div`
    display: flex;
    
    align-items: center;
`

const Button = styled(ButtonBase)`
    border-radius: 4px !important;
    margin-left: 8px !important;
    margin-right: 8px !important;
    padding: 8px !important;
    border-bottom: ${props => props.isActive ? `1px solid ${appColors[props.theme].primarySimple} !important` : "1px solid transparent !important"};
`

function ThemePopover(props) {
    return (
        <Container>
            <Button onClick={() => props.onChangeTheme("midnight")} theme={props.theme} isActive={props.theme === "midnight"}>
                <SelectThemeContainer>
                    <RoundedColor color={appColors.midnight.secondary} />
                Midnight
                </SelectThemeContainer>
            </Button>
            <Button onClick={() => props.onChangeTheme("ocean")} theme={props.theme} isActive={props.theme === "ocean"}>
                <SelectThemeContainer>
                    <RoundedColor color={appColors.ocean.secondary} />
                Ocean
                </SelectThemeContainer>
            </Button>
            <Button onClick={() => props.onChangeTheme("natural")} theme={props.theme} isActive={props.theme === "natural"}>
                <SelectThemeContainer>
                    <RoundedColor color={appColors.natural.secondary} />
                Natural
            </SelectThemeContainer>
            </Button>
            <Button onClick={() => props.onChangeTheme("dracula")} theme={props.theme} isActive={props.theme === "dracula"}>
                <SelectThemeContainer>
                    <RoundedColor color={appColors.dracula.secondary} />
                Dracula
            </SelectThemeContainer>
            </Button>
        </Container>
    )
}

ThemePopover.prototype = {
    onChangeTheme: PropTypes.func.isRequired,
    theme: PropTypes.string.isRequired
}

export default ThemePopover

