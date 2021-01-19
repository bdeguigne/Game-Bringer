import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Autocomplete } from '@material-ui/lab'
import { TextField } from '@material-ui/core'
import { advancedSearchPadding } from '../../utils/styles'
import styled from 'styled-components'

const Container = styled.div`
    padding: ${advancedSearchPadding};
`


const testOptions = [
    {
        title: "Label 1",
        test: 1234
    },
    {
        title: "Label 2",
        test: 1234
    },
    {
        title: "Label 3",
        test: 1234
    },
    {
        title: "Label 4",
        test: 1234
    }
]

export const SearchbarFilter = (props) => {
    return (
        <Container>
            <Autocomplete
                multiple
                options={testOptions}
                getOptionLabel={(option) => option.title}
                limitTags={1}
                size="small"
                ChipProps={{color: "primary"}}
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

SearchbarFilter.propTypes = {
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(SearchbarFilter)
