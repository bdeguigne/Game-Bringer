/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Autocomplete } from '@material-ui/lab'
import { TextField } from '@material-ui/core'
import { advancedSearchPadding, Center } from '../../utils/styles'
import styled from 'styled-components';
import CircularProgress from '@material-ui/core/CircularProgress';

//REDUX
import { searchByName } from '../../redux/actions/filtersActions';

const Container = styled.div`
    padding: ${advancedSearchPadding};
`

const TextFieldFilter = (props) => {
    const [suggestionsData, setSuggestionsData] = useState([]);
    const [value, setValue] = useState([]);
    const [correctDefault, setcorrectDefault] = useState(false);
    const [excludeData, setExcludeData] = useState([]);
    const [excludeDataLabel, setExcludeDataLabel] = useState([]);

    const isExclude = (element) => {
        let isExclude = false;

        if (props.excludeLabel) {
            props.excludeLabel.forEach(exclude => {
                if (exclude === element) {
                    isExclude = true;
                }
            })
        }

        return isExclude;
    }

    const onInputChange = (evt, value, reason) => {
        if (props.onTypeSuggestion) {
            props.searchByName(props.endpoint, evt.target.value, props.slug, props.exclude);
        }
    }

    const onChange = (evt, value, reason) => {
        setValue(value)
        const options = Array.prototype.map.call(value,
            function (item) {
                return item.id;
            }).join(",");

        const labels = Array.prototype.map.call(value,
            function (item) {
                return item.name;
            }).join(",");

        sendChange(options, labels);
    }

    const onOpen = () => {
        if (props.searchResults.length === 0) {
            props.searchByName(props.endpoint, "", props.slug, props.exclude);
        } else {
            let isExist = false;
            props.searchResults.forEach(element => {
                if (element[props.slug]) {
                    isExist = true;
                }
            });
            if (!isExist) {
                props.searchByName(props.endpoint, "", props.slug, props.exclude);
            }
        }
    }

    const sendChange = (data, label) => {
        let separator = ",";
        let excludeComma = excludeData.join(",");
        let excludeCommaLabel = excludeDataLabel.join(",");
        if (data === "" || excludeData.length === 0) {
            separator = "";
        }

        let results = {
            title: props.title,
            slug: props.slug,
            type: "textField",
            data: data.concat(separator + excludeComma),
            label: label.concat(separator + excludeCommaLabel),
        }
        if (props.onChange) {
            props.onChange(results);
        }

    }

    useEffect(() => {
        props.searchResults.forEach(element => {
            let result = element[props.slug];
            if (result) {
                var correctData = [];
                setSuggestionsData(result);

                if (correctDefault === false && props.isCorrectSet) {
                    props.valueLabel.forEach(query => {
                        result.forEach(element => {
                            if (element.name === query) {
                                correctData.push(element);
                            }
                        })
                    })
                    setValue(correctData);
                    setcorrectDefault(true);
                }
            }
        });

    }, [props.searchResults, props.slug])

    useEffect(() => {
        if (props.exclude && props.excludeLabel) {
            let excludeValue = [];
            let excludeLabel = [];
            props.value.forEach(element => {
                props.exclude.forEach((excludeElement, index) => {
                    if (excludeElement === element) {
                        excludeValue.push(element)
                        excludeLabel.push(props.excludeLabel[index])
                    }
                })
            })

            setExcludeData(excludeValue);
            setExcludeDataLabel(excludeLabel);
        }

    }, [props.value, props.exclude])

    useEffect(() => {
        if (props.valueLabel && props.valueLabel.join(",") && props.isCorrectSet && correctDefault === false) {
            let correct = props.valueLabel.filter(value => !isExclude(value))
            setValue(correct)
        }
    }, [props.valueLabel, props.isCorrectSet])

    useEffect(() => {
        let change = false
        var correctData = [];

        if (props.value.join(",") === "") {
            correctData = [];
            change = true;
        }

        if (suggestionsData && props.valueLabel) {
            suggestionsData.forEach(element => {
                if (element) {
                    props.valueLabel.forEach(query => {
                        if (element.name === query) {
                            change = true;
                            correctData.push(element);
                        }
                    })
                }
            });

            if (change === true) {
                setValue(correctData);
            }
        }
    }, [props.refresh])

    return (
        <Container>
            <Autocomplete
                multiple
                options={suggestionsData}
                getOptionLabel={(option) => option.name || option}
                getOptionSelected={(option, value) => (option.name === value.name) || option === value}
                loading={props.isRequest}
                limitTags={1}
                loadingText={<Center><CircularProgress /></Center>}
                value={value}
                size="small"
                ChipProps={{ color: "primary" }}
                onOpen={onOpen}
                onChange={onChange}
                onInputChange={onInputChange}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        variant="outlined"
                        label={props.label}
                        placeholder={props.placeholder}
                    />
                )}
            />
        </Container>
    )
}

TextFieldFilter.propTypes = {
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    value: PropTypes.array,
    valueLabel: PropTypes.array,
    slug: PropTypes.string,
    endpoint: PropTypes.string,
    exclude: PropTypes.array,
    excludeLabel: PropTypes.array,
    refresh: PropTypes.number,
    activatedFilters: PropTypes.object,
    onTypeSuggestion: PropTypes.bool
}

const mapStateToProps = (state) => ({
    isRequest: state.filtersReducer.textFieldSearchResult.isRequest,
    searchResults: state.filtersReducer.textFieldSearchResult.res,
    isCorrectSet: state.uiReducer.isCorrectIds
})

const mapDispatchToProps = {
    searchByName
}

export default connect(mapStateToProps, mapDispatchToProps)(TextFieldFilter)
