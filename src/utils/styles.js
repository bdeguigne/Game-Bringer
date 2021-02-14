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
    "backgroundContrast": "#08080f",
    "hover": "rgba(254,170,69, 0.04)",
    "primarySimple": "rgb(254,170,69)",
    "shine": "#fff",

    /* Advanced Search */
    "searchResultItemBackground": "#1E141F",
    "filtersBackgroundColor": "#141529"
};

/* Carousel */

const selectedShadowColor = "rgba(109,93,211,0.17)";
const shadowColor = "rgba(0,0,0,0.19)";

export const maxWidth = "1152px";

export const carousel = {
    hoveredNeonBoxShadow: `0 0 0.5rem ${appColors.secondary}, 0 0 2rem -21px ${appColors.secondary}, inset 12px -20px 2rem -24px ${appColors.secondary}, 0 0 4rem -15px ${appColors.secondary};`,
    hoveredNeonBoxShadowMobile: `0 0 0.5rem ${appColors.secondary}, 0 0 2rem -14px ${appColors.secondary}, inset 12px -24px 2rem -24px ${appColors.secondary}, 0 0 4rem -45px ${appColors.secondary};`,
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
export const topBarNeonBoxShadow = `0 0 0.5rem #fff, 0 0 2rem -21px ${appColors.secondary}, inset 0px -20px 2rem -24px ${appColors.secondary}, 0 0 4rem -15px ${appColors.secondary};`
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


/* Advanced Search */

export const resultItemBoxShadow = "0px 4px 4px rgba(0, 0, 0, 0.25);"
export const advancedSearchPadding = "4px 6px 4px 6px";

export const openDrawerButton = `0px 0px 30px 0px ${appColors.secondary}, 0px 0px 12px -11px #ffffff, inset 0px 0px 32px -5px ${appColors.secondary}`;

/* Others */

export const Padding = styled.div`
    padding-left: 16px;
    padding-right : 16px;

    @media only screen and (min-width: 768px) {
        /* For desktop */
        padding-left: ${props => props.type === "slider" ? 0 : "80px"};
        padding-right : ${props => props.type === "slider" ? "96px" : "80px"};
    }
`

export const Center = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  margin: ${props => props.margin};
`

export const SectionTitle = styled.h2`
  font-size: 19px;
  text-transform: uppercase;
  font-weight: normal;
  margin-bottom: 24px;
`

export const ArrowIcon = styled.span`
  cursor: pointer;
  font-size: 2.0rem;
  transition: text-shadow, color 0.3s;
  color: ${appColors.secondaryDarker};
  margin-left: 8px;
  margin-right: 8px;

  &:hover {
    color: white;
    text-shadow: 0 0 1rem #fff, 0 0 2rem ${appColors.secondary}, 0 0 4rem ${appColors.secondary}, 0 0 6rem ${appColors.secondary};
  }
`