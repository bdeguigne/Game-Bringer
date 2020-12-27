import styled from "styled-components";

export const appColors = {
    "900": "#131D25",
    "800": "#1D242E",
    "700": "#282F3A",
    "600": "#58606C",
    "500": "#9FA6B1",
    "400": "#EDF1F6",
    "300": "#FFFFFF",
};

export const barBoxShadow = "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)";
export const SkeletonColor = appColors[700];

export const Padding = styled.div`
    padding-left: 16px;
    padding-right : 16px;

    @media only screen and (min-width: 768px) {
        /* For desktop */
        padding-left: 80px;
        padding-right : 80px;
    }
`