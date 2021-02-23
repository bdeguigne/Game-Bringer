import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import styled from 'styled-components';

const Text = styled(Typography)`
    font-size: ${props => props.fontSize ? props.fontSize  : "1rem" } !important;

`

export default function CircularProgressWithLabel(props) {
    return (
        <Box position="relative" display="inline-flex">
            <CircularProgress size={props.size ? props.size : 80} variant="determinate" {...props} />
            <Box
                top={0}
                left={0}
                bottom={0}
                right={0}
                position="absolute"
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                <Text fontSize={props.fontSize} variant="caption" component="div">{`${Math.round(
                    props.value,
                )}`}</Text>
            </Box>
        </Box>
    );
}

CircularProgressWithLabel.propTypes = {
    /**
     * The value of the progress indicator for the determinate variant.
     * Value between 0 and 100.
     */
    value: PropTypes.number.isRequired,
    size: PropTypes.number,
    fontSize: PropTypes.string
};