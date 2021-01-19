/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import styled from "styled-components";
import { Chip } from "@material-ui/core";
import { appColors } from "../../utils/styles";
import PropTypes from 'prop-types'

const ChipsContainer = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
`

const FiltersChip = styled(Chip)`
  background: ${appColors.primary} !important;
  
  margin-right: 12px;
  margin-bottom: 12px;
  font-size: 14px !important;
`

const AllProductsText = styled.div`
  font-size: 18px;
  color: ${appColors["600"]};
`



const HandleFilters = props => {

    useEffect(() => {
      console.log("TERM ", props.term);
    }, [props.term])

    return (
        <ChipsContainer>
            {props.term ? (
                <FiltersChip
                    label={`"${props.term}"`}
                    color={"primary"}
                    onDelete={() => { }}
                />
            ) : (
                    <AllProductsText>All products</AllProductsText>
                )}
        </ChipsContainer>
    );
};

HandleFilters.propTypes = {
    term: PropTypes.string
};

export default HandleFilters;
