import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { appColors, advancedSearchPadding} from '../../utils/styles';

const Container = styled.div`
    margin-bottom: 16px;
    font-size: 12px;
`

const Box = styled.div`
    width: 238px;
    border: 1px solid #141529;
    user-select: none;
`

const Header = styled.div`
    background: #141529;
    padding: ${advancedSearchPadding};
    font-size: 12px;
    cursor: pointer;
    /* border: 1px solid white; */
`

const Hideable = styled.div`
    overflow: ${props => props.hide ? "hidden" : "inherit"};
    height: ${props => props.hide ? "0px" : "100%"};
`


const SeeAllContainer = styled.div`
    margin-top: 4px;
    width: 100%;
    display: flex;
    justify-content: flex-end;
    user-select: none;
`

const SeeAllButton = styled.div`
    cursor: pointer;
    text-transform: uppercase;
    color: ${appColors.primarySimple};
`

const Collapsable = props => {
    const [collapse, setCollapse] = useState(props.collapse);
    const [expanded, setExpanded] = useState(false);
    
    const seeAll = () => {
        if (props.onSeeAllClick) {
            props.onSeeAllClick(props.index);
        }
        setExpanded(true);
    }

    return (
        <Container>
            <Box>
                <Header onClick={() => setCollapse(!collapse)}>
                    {props.title}
                </Header>
                <Hideable hide={!collapse}>
                    <div>
                        {props.children}
                    </div>
                </Hideable>
            </Box>
            {!props.showAll && !expanded && collapse && (
                <SeeAllContainer>
                    <SeeAllButton onClick={seeAll}>See All</SeeAllButton>
                </SeeAllContainer>
            )}
        </Container>
    )
}

Collapsable.defaultProps = {
    showAll: true,
    collapse: false
}

Collapsable.propTypes = {
    title: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    showAll: PropTypes.bool,
    onSeeAllClick: PropTypes.func,
    collapse: PropTypes.bool
}

export default Collapsable
