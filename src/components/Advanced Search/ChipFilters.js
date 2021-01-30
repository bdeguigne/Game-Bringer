/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import styled from "styled-components";
import { Chip } from "@material-ui/core";
import { appColors } from "../../utils/styles";
import PropTypes from 'prop-types'
import { removeTerm } from './filters';

const ChipsContainer = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  margin-bottom: 24px;
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



const ChipFilters = props => {

  // useEffect(() => {
  //   console.log("TERM ", props.activatedFilters);
  // }, [props.activatedFilters])

  return (
    <ChipsContainer>
      {props.activatedFilters.chip ? Object.keys(props.activatedFilters.chip).map(key => {
        return (
          props.activatedFilters.chip[key].split(",").map((filter, index) => {
            const id = props.activatedFilters.front[key].split(",")[index];
            return (
              <FiltersChip
                key={index}
                label={key === "term" ? `"${filter}"` : `${filter}`}
                color={"primary"}
                onDelete={() => {
                  props.onChangeFilters(removeTerm(id, filter, key, props.activatedFilters))
                }}
              />
            )
          })
        )
      }) : (
          <AllProductsText>All products</AllProductsText>
        )}
    </ChipsContainer>
  );
};

ChipFilters.propTypes = {
  activatedFilters: PropTypes.object,
  onChangeFilters: PropTypes.func
};

export default ChipFilters;
