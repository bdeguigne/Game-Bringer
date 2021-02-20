/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import { Chip } from "@material-ui/core";
import { appColors } from "../../utils/styles";
import PropTypes from 'prop-types'
import { removeTerm } from './Filters';
import { connect } from 'react-redux';

const ChipsContainer = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  margin-bottom: 24px;
`

const FiltersChip = styled(Chip)`
  background: ${appColors["midnight"].primary} !important;
  
  margin-right: 12px;
  margin-bottom: 12px;
  font-size: 14px !important;
`

const AllProductsText = styled.div`
  font-size: 18px;
  color: ${appColors["600"]};
`

const ChipFilters = props => {
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    if (props.isFiltersLoaded && props.isNeedRequest) {
      setShowFilters(true);
    } else {
      // setShowFilters(props.isFiltersLoaded);
      setShowFilters(props.isFiltersLoaded);
    }
  }, [props.isFiltersLoaded, props.isCorrectIds])

  return (
    <ChipsContainer>
      {showFilters && props.activatedFilters?.chip ? Object.keys(props.activatedFilters.chip).map(key => {
        const [min, max] = props.activatedFilters.front[key].split(",");
        if (key === "sort")
          return null
        return key === "rating" ? (
          <FiltersChip
            key={1}
            label={`Minimum rating : ${min}, Maximum rating : ${max}`}
            color={"primary"}
            onDelete={() => {
              props.onChangeFilters(removeTerm(null, null, key, props.activatedFilters, true))
            }}
          />
        ) : (
          props.activatedFilters.chip[key].split(",").map((filter, index) => {
            const id = props.activatedFilters.front[key].split(",")[index];
            return (
              <FiltersChip
                key={index + 1}
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

function mapStateToProps(state) {
  return {
    isFiltersLoaded: state.filtersReducer.isFiltersLoaded,
    isNeedRequest: state.uiReducer.isNeedRequest,
    isCorrectIds: state.uiReducer.isCorrectIds,
    activatedFilters: state.filtersReducer.filters,
  };
}

ChipFilters.propTypes = {
  // activatedFilters: PropTypes.object,
  onChangeFilters: PropTypes.func
};

export default connect(mapStateToProps)(ChipFilters);
