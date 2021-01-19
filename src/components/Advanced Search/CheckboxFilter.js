/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Checkbox, FormControlLabel } from '@material-ui/core';
import { advancedSearchPadding, appColors } from '../../utils/styles';

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 30px;
    background: ${props => props.checked ? appColors.secondaryDarker : "transparent"};
    padding: ${advancedSearchPadding};
    transition: background 0.3s;
`

const SmallCheckBox = styled(Checkbox)`
    /* padding: 0px 8px 0x 8px !important; */
    opacity: ${props => props.opacity ? props.opacity : 1};
`

function CheckboxFilter(props) {
    const [isActiveByUrl] = useState(props.active)
    const [checked, setChecked] = useState(props.active)
    const [exclude, setExclude] = useState(false)

    let title = props.title;
    let label = props.label;
    let slug = props.slug;
    let onChange = props.onChange;

    useEffect(() => {
        let results = {
            title,
            type: "checkbox",
            slug: title.toLowerCase(),
            data: {
                label,
                slug,
                checked,
                exclude
            }
        }
        if (onChange && !isActiveByUrl) {
            onChange(results)
        }
    }, [checked, exclude, title, label, slug])

    const handleChangeChecked = (evt) => {
        let state = evt.target.checked;
        setChecked(state);
        if (exclude === true) {
            
            setExclude(false);
        }
    }

    const handleChangeExclude = (evt) => {
        let state = evt.target.checked;
        setExclude(state);
        if (checked === true) {
            setChecked(false);
        }
    }

    return (
        <Container checked={checked || exclude}>
            <FormControlLabel
                control={
                    <SmallCheckBox
                        checked={checked}
                        onChange={handleChangeChecked}
                        name={props.label}
                        color="primary"
                    />
                }
                label={props.label}
            />
            <SmallCheckBox
                indeterminate
                checked={exclude}
                onChange={handleChangeExclude}
                name={props.label}
                color="secondary"
                opacity="0.5"
            />
        </Container>
    )
}

CheckboxFilter.default = {
    active: false
}

CheckboxFilter.propTypes = {
    title: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    slug: PropTypes.string.isRequired,
    active: PropTypes.bool.isRequired
}

export default CheckboxFilter

