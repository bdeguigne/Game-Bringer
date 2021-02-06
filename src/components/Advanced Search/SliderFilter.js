import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import { Slider, TextField } from '@material-ui/core';
import styled from 'styled-components';
import { advancedSearchPadding } from '../../utils/styles'
import { max } from 'moment';

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
    const [inputValue, setInputValue] = useState([0, 100]);
    const [sliderValue, setSliderValue] = useState([0, 100]);
    const [isFocusTextFields, setIsFocusTextFields] = useState(false);
    const [isDefaultSet, setIsDefaultSet] = useState(false);
    const [isAnyMin, setIsAnyMin] = useState(true);
    const [isAnyMax, setIsAnyMax] = useState(true);

    const handleSliderChange = (event, newValue) => {
        setSliderValue(newValue);
        setInputValue(newValue);
    };

    useEffect(() => {
        if (!isNaN(inputValue[0]) && !isNaN(inputValue[1]) && (inputValue[0] !== "" && inputValue[1] !== "")) {
            if ((inputValue[0] >= 0 && inputValue[0] <= 100) &&
                (inputValue[1] >= 0 && inputValue[1] <= 100)) {
                setSliderValue(inputValue);
                if (isFocusTextFields) {
                    sendSliderValue(inputValue);
                }
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inputValue])


    useEffect(() => {
        if (props.value && props.value[0] !== "" && isDefaultSet === false) {
            let min = parseInt(props.value[0]);
            let max = parseInt(props.value[1]);
            setSliderValue([min, max]);
            setInputValue([min, max]);
            setIsDefaultSet(true);
        }
    }, [props.value, isDefaultSet])

    const onChange = (type, evt) => {
        let items = [...inputValue];
        let minValue = items[0]
        let maxValue = items[1];
        let newValue = parseInt(evt.target.value);

        if (minValue < maxValue) {
            if (isNaN(newValue)) {
                newValue = "";
            }

            if (type === "min") {
                minValue = newValue;
                items[0] = minValue;
            } else {
                maxValue = newValue;
                items[1] = maxValue;
                setInputValue(items);

            }

        } else {
            let change = false;

            if (type === "min" && newValue < maxValue) {
                minValue = newValue;
                items[0] = minValue;
                change = true;
            } else if (type === "max" && newValue > minValue) {
                maxValue = newValue;
                items[1] = maxValue;
                change = true
            }
            if (change) {
                setInputValue(items);
            }
        }


    }

    const sendSliderValue = (inputValue) => {
        // setIsAnyMin(inputValue[0] < 0 ? true : false);
        // setIsAnyMax(inputValue[1] < 0 ? true : false);

        let results = {
            title: props.title,
            type: "slider",
            slug: props.slug,
            replace: true,
            data: {
                minimum: inputValue[0],
                maximum: inputValue[1]
            }
        }
        if (props.onChange) {
            props.onChange(results);
        }
    }

    useEffect(() => {
        if (props.activatedFilters?.front?.rating) {
            const rating = props.activatedFilters?.front.rating.split(",");

            setIsAnyMin(rating[0] ? (rating[0] < 0 ? true : false) : true);
            setIsAnyMax(rating[1] ? (rating[1] < 0 ? true : false) : true);
        } else {
            setSliderValue([0, 100])
            setIsAnyMin(true);
            setIsAnyMax(true);
        }
    }, [props.refresh, props.activatedFilters])

    // useEffect(() => {
    //     if (inputValue[1]) {
    //         setSliderValue([0, inputValue[1]])
    //     }
    // }, [isAnyMin])

    // useEffect(() => {
    //     if (inputValue[0]) {
    //         setSliderValue([inputValue[0], 100])
    //     }
    // }, [isAnyMax])

    return (
        <Container>
            <SliderContainer>
                <Slider
                    value={sliderValue}
                    onChange={handleSliderChange}
                    valueLabelDisplay="auto"
                    aria-labelledby="range-slider"
                    onChangeCommitted={() => sendSliderValue(sliderValue)}
                />
            </SliderContainer>
            <TextFieldsContainer>
                <TextFieldWithMargin
                    disabled={isAnyMin}
                    marginright={"4px"}
                    variant="outlined"
                    type={isAnyMin ? "text" : "number"}
                    value={isAnyMin ? "any" : inputValue[0]}
                    onChange={(text) => onChange("min", text)}
                    label="Minimum"
                    onFocus={() => setIsFocusTextFields(true)}
                    onBlur={() => setIsFocusTextFields(false)}
                />
                <TextFieldWithMargin
                    disabled={isAnyMax}
                    marginright={"0"}
                    variant="outlined"
                    type={isAnyMax ? "text" : "number"}
                    value={isAnyMax ? "any" : inputValue[1]}
                    onChange={(text) => onChange("max", text)} label="Maximum"
                    onFocus={() => setIsFocusTextFields(true)}
                    onBlur={() => setIsFocusTextFields(false)}
                />
            </TextFieldsContainer>
        </Container>
    )
}

SliderFilter.propTypes = {
    title: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    value: PropTypes.array,
    slug: PropTypes.string,
    activatedFilters: PropTypes.object,
    refresh: PropTypes.number
}

export default SliderFilter

