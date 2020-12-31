import styled from "styled-components";

export const appColors = {
    "900": "#131d25",
    "800": "#1D242E",
    "700": "#282F3A",
    "600": "#58606C",
    "500": "#9FA6B1",
    "400": "#EDF1F6",
    "300": "#FFFFFF",
    "primary": "linear-gradient(90deg, #FC5D44 0%, #FEAA45 100%);",
    "secondary": "rgb(109,93,211)",
    "secondaryTransparent": "rgba(109,93,211,0.2)",
    "secondaryDarker": "rgb(39,35,79, 0.8)",
    "backgroundColor": "#212028",
    "hover": "rgba(254,170,69, 0.1)",
    "navBarTabs": "rgb(254,170,69)",
};

/* Carousel */

const selectedShadowColor = "rgba(109,93,211,0.17)";
const shadowColor = "rgba(0,0,0,0.19)";

export const carousel = {
    hoveredBoxShadow : `12px 6px 14px -3px ${selectedShadowColor}, -12px 6px 14px -3px ${selectedShadowColor};`,
    selectedBoxShadow: "0px 0px 20px 4px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.19);",
    boxShadow : `0 10px 20px ${shadowColor}, 0 6px 6px ${shadowColor};`,
    border: `3px solid ${appColors.secondaryTransparent};`
}

export const sideNavWidth = {
    expanded: "180px",
    normal: "50px"
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