import styled from "styled-components";

//RED THEME
//secondary : "rgb(238,13,13)"
//background : "--background-color: #290000;"

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
    "secondaryDarker": "rgb(39,35,79, 1)",
    "backgroundColor": "#0d0e1b",
    "backgroundContrast": "#120c13",
    "hover": "rgba(254,170,69, 0.04)",
    "primarySimple": "rgb(254,170,69)",
    "shine": "#fff"
};

/* Carousel */

const selectedShadowColor = "rgba(109,93,211,0.17)";
const shadowColor = "rgba(0,0,0,0.19)";

export const maxWidth = "1152px";

export const carousel = {
    hoveredNeonBoxShadow: `0 0 0.5rem ${appColors.secondary}, 0 0 2rem -21px ${appColors.secondary}, inset 12px -20px 2rem -24px ${appColors.secondary}, 0 0 4rem -15px ${appColors.secondary};`,
    hoveredBoxShadow : `12px 6px 14px -3px ${selectedShadowColor}, -12px 6px 14px -3px ${selectedShadowColor};`,
    selectedBoxShadow: "0px 0px 20px 4px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.19);",
    boxShadow : `0 10px 20px ${shadowColor}, 0 6px 6px ${shadowColor};`,
    border: `3px solid ${appColors.secondaryTransparent};`,
    indicatorBoxShadow: `0 0 50px -5px #fff, 0 0 50px -9px ${appColors.secondary}, inset 0px 0px 30px -31px rgb(255 255 255), 0 0 4rem -15px ${appColors.secondary}`
}

/* Side Nav */
export const sideNavWidth = {
    expanded: "180px",
    normal: "72px"
};
export const sideNavPaddingLeft = "24px";
export const sideNavNeonBorder = "2px solid #fff;";
export const sideNavNeonBoxShadow = `0 0 0.5rem #fff, 10px 0px 2rem -21px ${appColors.secondary}, inset -12px 0px 2rem -24px ${appColors.secondary}, -16px 0px 4rem -15px ${appColors.secondary}`
export const sideNavNeonBoxShadowSoft = `1px 0px 27px -20px #fff, inset -16px 0px 3rem -63px ${appColors.secondary}, -5px 0px 6rem -27px ${appColors.secondary};`;
export const sideNavIndicatorBoxShadow = `rgb(255 255 255) 0px 0px 20px 0px, ${appColors.primarySimple} 0px 0px 20px 1px;`

/* Top Bar */
export const barBoxShadow = "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)";
export const topBarNeonBoxShadow = `0 0 0.5rem #fff, 0 0 2rem -21px ${appColors.secondary}, inset 12px -20px 2rem -24px ${appColors.secondary}, 0 0 4rem -15px ${appColors.secondary};`
export const topBarNeonBoxShadowSoft = `0 0 20px -11px #fff, 0 0 0rem -12px ${appColors.secondary}, inset 0px -7px 3rem -31px ${appColors.secondary}, 0px 0px 5rem -22px ${appColors.secondary};`;
export const topBarNeonBorder = "2px solid #fff;";


/* Game Showcase */
export const gameShowNeonBoxShadow = `0px 0px 64px -24px ${appColors.secondary}, 0px 0px 8px #FFFFFF, inset 0px 0px 32px -15px ${appColors.secondary};`

export const SkeletonColor = appColors[900];
export const toolTipBoxShadow = `0px 0px 0.5rem -4px #fff, 0 0 2rem 0px ${appColors.secondary}, inset 12px -20px 2rem -45px ${appColors.secondary}, 0 0 4rem -39px ${appColors.secondary};`

/* CrossFade Component */

export const crossFadeImagesBoxShadow = `0px 0px 0.5rem -6px #000, 0 0 2rem -29px ${appColors.secondary}, 0 0 4rem -36px ${appColors.secondary};`

/* Buttons */

/* Primary Button */
export const PrimaryNeonBoxShadow = `0px 0px 64px -23px ${appColors.primarySimple};`
export const PrimaryNeonBoxShadowHover = `0px 0px 64px -15px ${appColors.primarySimple}, 0px 0px 32px -14px #FFFFFF, inset 0px 0px 32px -14px #FFFFFF;`

/* Genres */
export const genresNeonBoxShadow = `0px 0px 64px -20px ${appColors.secondary}, 0px 0px 8px -4px #FFFFFF, inset 0px 0px 32px -15px ${appColors.secondary}`
export const genresNeonBoxShadowHover = `0px 0px 64px 0px ${appColors.secondary}, 0px 0px 21px -4px #FFFFFF, inset 0px 0px 32px -15px ${appColors.secondary};`

export const Padding = styled.div`
    padding-left: 16px;
    padding-right : 16px;

    @media only screen and (min-width: 768px) {
        /* For desktop */
        padding-left: ${props => props.type === "slider" ? 0 : "80px"};
        padding-right : ${props => props.type === "slider" ? "96px" : "80px"};
    }
`