import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
    margin-left: 16px;
`

function RightContent(props) {
    return (
        <Container>
            <p>Test</p>
        </Container>
    )
}

RightContent.propTypes = {
    game: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    theme: PropTypes.string
}

export default RightContent

