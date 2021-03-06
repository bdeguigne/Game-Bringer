import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import styled from 'styled-components';
import { connect } from 'react-redux'

const SelectContainer = styled(FormControl)`
    min-width: 120px !important;
`

const Container = styled.div`
    display: flex;
    align-items: center;
`

function SelectSort(props) {
    const [sort, setSort] = useState("");

    const handleChange = (event) => {
        setSort(event.target.value);
    };

    useEffect(() => {
            props.onChange(sort);
     
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sort])

    useEffect(() => {
        props.onChange(sort);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (props.activatedFilters?.chip?.sort) {
            setSort(props.activatedFilters?.chip?.sort)
        }
    }, [props.activatedFilters])

    return (
        <Container>

            <SelectContainer >
                <InputLabel>Sort by</InputLabel>
                <Select
                    labelId="sort-select-label"
                    id="sort-select"
                    value={sort}
                    onChange={handleChange}
                >
                    <MenuItem value={""}>Any</MenuItem>
                    <MenuItem value={"first_release_date-desc"}>Release date descending</MenuItem>
                    <MenuItem value={"first_release_date-asc"}>Release date ascending</MenuItem>
                    <MenuItem value={"aggregated_rating-desc"}>Reviews</MenuItem>
                </Select>
            </SelectContainer>
        </Container>
    )
}

SelectSort.propTypes = {
    onChange: PropTypes.func,
}

function mapStateToProps(state) {
    return {
        activatedFilters: state.filtersReducer.filters,
    }
}

export default connect(mapStateToProps)(SelectSort)

