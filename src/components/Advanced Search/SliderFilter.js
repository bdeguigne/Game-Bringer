import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import { Slider, TextField } from '@material-ui/core';
import styled from 'styled-components';
import {advancedSearchPadding} from '../../utils/styles'

const Container = styled.div`
padding: ${advancedSearchPadding};
`

const SliderContainer = styled.div`
    padding-left: 6px;
    padding-right: 6px;
    
`

const TextFieldsContainer = styled.div`
    display: flex;
    width: 100%;
    margin-top: 4px;
`

const TextFieldWithMargin = styled(TextField)`
    margin-right: ${props => props.marginright} !important;
`

function SliderFilter(props) {
    const [inputValue, setInputValue] = useState(props.value);
    const [sliderValue, setSliderValue] = useState(props.value);

    const handleSliderChange = (event, newValue) => {
        setSliderValue(newValue);
        setInputValue(newValue);
    };

    useEffect(() => {
        if (!isNaN(inputValue[0]) && !isNaN(inputValue[1]) && (inputValue[0] !== "" &&  inputValue[1] !== "")) {
            if ((inputValue[0] >= 0 && inputValue[0] <= 100) &&
                (inputValue[1] >= 0 && inputValue[1] <= 100)) {
                setSliderValue(inputValue);
            }
        }
    }, [inputValue])

    useEffect(() => {
        let results = {
            title: props.title,
            data: {
                minimum: sliderValue[0],
                maximum: sliderValue[1]
            }
        }
        if (props.onChange) {
            props.onChange(results);
        }
    }, [sliderValue, props])

    useEffect(() => {
        setSliderValue(props.value);
        setInputValue(props.value);
    }, [props.value])

    const onChange = (type, evt) => {
        let items = [...inputValue];
        let minValue = items[0]
        let maxValue = items[1];
        let newValue = parseInt(evt.target.value);

        if (isNaN(newValue)) {
            newValue = "";
        }

        if (type === "min") {
            minValue = newValue;
            items[0] = minValue;
        } else {
            maxValue = newValue;
            items[1] = maxValue;
        }

        setInputValue(items);
    }

    return (
        <Container>
            <SliderContainer>
                <Slider
                    value={sliderValue}
                    onChange={handleSliderChange}
                    valueLabelDisplay="auto"
                    aria-labelledby="range-slider"
                />
            </SliderContainer>
            <TextFieldsContainer>
                <TextFieldWithMargin marginright={"4px"} variant="outlined" type="number" value={inputValue[0]} onChange={(text) => onChange("min", text)} label="Minimum" />
                <TextFieldWithMargin marginright={"0"} variant="outlined" type="number" value={inputValue[1]} onChange={(text) => onChange("max", text)} label="Maximum" />
            </TextFieldsContainer>
        </Container>
    )
}

SliderFilter.defaultProps = {
    value: [0, 100]
}

SliderFilter.propTypes = {
    title: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    value: PropTypes.array
}

export default SliderFilter

