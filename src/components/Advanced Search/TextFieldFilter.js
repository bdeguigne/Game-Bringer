/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Autocomplete } from '@material-ui/lab'
import { TextField } from '@material-ui/core'
import { advancedSearchPadding } from '../../utils/styles'
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
    const [defaultSet, setDefaultSet] = useState(false);
    const [correctDefault, setcorrectDefault] = useState(false);
    const [excludeData, setExcludeData] = useState([]);

    const isExclude = (element) => {
        let isExclude = false;

        if (props.exclude) {
            props.exclude.forEach(exclude => {
                if (exclude === element) {
                    isExclude = true;
                }
            })
        }

        console.log("ISS", isExclude, props.exclude, element);
        return isExclude;
    }

    const onInputChange = (evt, value, reason) => {
        if (props.searchResults.length === 0) {
            props.searchByName(props.endpoint, "", props.slug, props.exclude);
        }
    }

    const onChange = (evt, value, reason) => {
        setValue(value)
        const options = Array.prototype.map.call(value,
            function (item) {
                return item.id;
            }).join(",");

        sendChange(options);
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

    const sendChange = (data) => {
        let separator = ",";
        let excludeComma = excludeData.join(",");
        if (data === "" || excludeData.length === 0) {
            separator = "";
        }

        let results = {
            title: props.title,
            slug: props.slug,
            type: "textField",
            data: data.concat(separator + excludeComma)
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

                if (correctDefault === false) {
                    props.value.forEach(query => {
                        result.forEach(element => {
                            if (element.id === parseInt(query) && !isExclude(query)) {
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
        if (defaultSet === false) {
            props.value.forEach(element => {
                if (element !== "") {
                    !isExclude(element) && setValue(value => [...value, { name: element, id: element }])
                }
            });

            setDefaultSet(true)

        }

        if (props.exclude) {
            let excludeValue = [];
            props.value.forEach(element => {
                props.exclude.forEach(excludeElement => {
                    if (excludeElement === element) {
                        excludeValue.push(element)
                    }
                })
            })

            setExcludeData(excludeValue);
        }

    }, [props.value, defaultSet, props.exclude])

    // useEffect(() => {
    //     console.log("EXCLUDE DATA", excludeData);
    // }, [excludeData])

    return (
        <Container>
            <Autocomplete
                multiple
                options={suggestionsData}
                getOptionLabel={(option) => option.name || option}
                getOptionSelected={(option, value) => option.name === value.name}
                loading={props.isRequest}
                limitTags={1}
                loadingText={<CircularProgress />}
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
    slug: PropTypes.string,
    endpoint: PropTypes.string,
    exclude: PropTypes.array
}

const mapStateToProps = (state) => ({
    isRequest: state.filtersReducer.textFieldSearchResult.isRequest,
    searchResults: state.filtersReducer.textFieldSearchResult.res
})

const mapDispatchToProps = {
    searchByName
}

export default connect(mapStateToProps, mapDispatchToProps)(TextFieldFilter)
