import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import { appColors, Link } from '../../utils/styles';


const Label = styled.span`
    font-weight: bold;
    text-transform: uppercase;
    font-size: 10px;
    color: #C4C4C4;
`

const AccordionContainer = styled.div`
    margin-top: 8px;
    margin-bottom: 8px;
`

const NormalPrice = styled.span`
    text-decoration: line-through;
    color: #c6c6c6;
    font-size: 10px;
    margin-right: 8px;
`

const SalePrice = styled.span`
    color:  ${props => appColors[props.theme].primarySimple};
    font-size: ${props => props.best ? "17px" : "14px"};
`

const StoreLogo = styled.img`
    width: 24px;
    height: 24px;
    object-fit: cover;
    margin-right: 8px;
`

const DealContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;

`

const Flex = styled.div`
    display : flex;
    align-items: center;
`

const StoreName = styled.a`
    font-size: 12px;
    text-decoration: none;
    color: inherit;
    transition: 0.2s;
    cursor: pointer;

    &:hover {
        color: ${props => appColors[props.theme].primarySimple};
    text-decoration: underline;

    }
`

function Deals(props) {
    const [bestPrice, setBestPrice] = useState(null);

    useEffect(() => {
        if (props.deals.deals) {
            setBestPrice(props.deals.deals[0]);
        }
    }, [props.deals])

    if (bestPrice) {

        return (
            <div>
                <Label>Top deals for this game :</Label>
                <AccordionContainer>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMore />}
                        >
                            <DealContainer >
                                <Flex>
                                    <StoreLogo src={`https://www.cheapshark.com${props.stores[parseInt(bestPrice.storeID) - 1]?.images?.logo}`} alt="storeLogo" />
                                    <StoreName

                                        theme={props.theme}
                                        href={`https://www.cheapshark.com/redirect?dealID=${bestPrice.dealID}`}
                                        target="_blank"
                                    >
                                        {props.stores[parseInt(bestPrice.storeID) - 1].storeName}</StoreName>
                                </Flex>
                                <Flex>
                                    <NormalPrice>${props.deals.normalPrice}</NormalPrice>
                                    <SalePrice best theme={props.theme}>${bestPrice.salePrice}</SalePrice>
                                </Flex>
                            </DealContainer>
                        </AccordionSummary>
                        {props.deals.deals.map((deal, i) => {
                            return i !== 0 ? (
                                <AccordionDetails>
                                    <DealContainer>
                                        <Flex>
                                            <StoreLogo src={`https://www.cheapshark.com${props.stores[parseInt(deal.storeID) - 1]?.images?.logo}`} alt="storeLogo" />
                                            <StoreName
                                                theme={props.theme}
                                                href={`https://www.cheapshark.com/redirect?dealID=${deal.dealID}`}
                                                target="_blank"
                                            >
                                                {props.stores[parseInt(deal.storeID) - 1].storeName}</StoreName>
                                        </Flex>
                                        <Flex>
                                            <SalePrice theme={props.theme}>${deal.salePrice}</SalePrice>
                                        </Flex>
                                    </DealContainer>
                                </AccordionDetails>
                            ) : null
                        })}

                    </Accordion>
                </AccordionContainer>
            </div>
        )
    } else {
        return null
    }

}

Deals.propTypes = {
    deals: PropTypes.array,
    stores: PropTypes.array,
    theme: PropTypes.string
}

export default Deals

