import styled from "styled-components";

export const appColors = {
  "midnight": {
    "900": "#131d25",
    "800": "#1D242E",
    "700": "#282F3A",
    "600": "#58606C",
    "500": "#9FA6B1",
    "400": "#EDF1F6",
    "300": "#FFFFFF",
    "primary": "linear-gradient(90deg, #FC5D44 0%, #FEAA45 100%);",
    "secondary": "rgb(109,93,211)",
    "secondaryTransparent": "rgba(109,93,211,0.5)",
    "secondaryDarker": "rgb(39,35,79, 1)",
    "backgroundColor": "#0d0e1b",
    "backgroundContrast": "#08080f",
    "hover": "rgba(254,170,69, 0.04)",
    "primarySimple": "rgb(254,170,69)",
    "shine": "#fff",

    /* Advanced Search */
    "searchResultItemBackground": "#1E141F",
    "searchResultItemBackgroundHover": "#0F0A10",
    "filtersBackgroundColor": "#1c1d38"
  },

  "ocean": {
    "900": "#131d25",
    "800": "#1D242E",
    "700": "#282F3A",
    "600": "#58606C",
    "500": "#9FA6B1",
    "400": "#EDF1F6",
    "300": "#FFFFFF",
    "primary": "linear-gradient(90deg, #CCA045 0%, #F3BF52 100%);",
    "secondary": "#6997E5",
    "secondaryTransparent": "rgba(105,151,229,0.5)",
    "secondaryDarker": "#3A547F",
    "backgroundColor": "#0F111A",
    "backgroundContrast": "#080B11",
    "hover": "rgba(254,170,69, 0.04)",
    "primarySimple": "#FFC856",
    "shine": "#fff",

    /* Advanced Search */
    "searchResultItemBackground": "#191E2D",
    "searchResultItemBackgroundHover": "#0E1119",
    "filtersBackgroundColor": "#232A3F"
  },

  "natural": {
    "900": "#131d25",
    "800": "#1D242E",
    "700": "#282F3A",
    "600": "#58606C",
    "500": "#9FA6B1",
    "400": "#EDF1F6",
    "300": "#FFFFFF",
    "primary": "linear-gradient(90deg, #8DB162 0%, #B9E981 100%);",
    "secondary": "#53A0B7",
    "secondaryTransparent": "rgba(194,55,72,0.5)",
    "secondaryDarker": "#284D59",
    "backgroundColor": "#212121",
    "backgroundContrast": "#1A1A1A",
    "hover": "rgba(254,170,69, 0.04)",
    "primarySimple": "#B9E981",
    "shine": "#fff",

    /* Advanced Search */
    "searchResultItemBackground": "#2E2E2E",
    "searchResultItemBackgroundHover": "#191919",
    "filtersBackgroundColor": "#2C2C2C"
  },


  "dracula": {
    "900": "#131d25",
    "800": "#1D242E",
    "700": "#282F3A",
    "600": "#58606C",
    "500": "#9FA6B1",
    "400": "#EDF1F6",
    "300": "#FFFFFF",
    "primary": "linear-gradient(90deg, #FC5D44 0%, #FEAA45 100%);",
    "secondary": "rgb(238,13,13)",
    "secondaryTransparent": "rgba(238,13,13,0.5)",
    "secondaryDarker": "rgb(97,5,5,1)",
    "backgroundColor": "#290000",
    "backgroundContrast": "#08080f",
    "hover": "rgba(254,170,69, 0.04)",
    "primarySimple": "rgb(254,170,69)",
    "shine": "#fff",

    /* Advanced Search */
    "searchResultItemBackground": "#380808",
    "searchResultItemBackgroundHover": "#210505",
    "filtersBackgroundColor": "#4f0b0b"
  }
};

export const maxWidth = "1152px";

/* Side Nav */
export const sideNavWidth = {
  expanded: "180px",
  normal: "72px"
};
export const sideNavPaddingLeft = "24px";
export const sideNavNeonBorder = "2px solid #fff;";

/* Top Bar */
export const barBoxShadow = "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)";
export const topBarNeonBorder = "2px solid #fff;";

/* Advanced Search */

export const resultItemBoxShadow = "0px 4px 4px rgba(0, 0, 0, 0.25);"
export const advancedSearchPadding = "4px 6px 4px 6px";

/* Others */

export const MainContent = styled.div`
  margin: 0 auto;
  width: ${maxWidth};
  max-width: 100%;
`

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
  color: ${props => appColors[props.theme].secondaryDarker};
  margin-left: 8px;
  margin-right: 8px;

  &:hover {
    color: white;
    text-shadow: ${props => `0 0 1rem #fff, 0 0 2rem ${appColors[props.theme].secondary}, 0 0 4rem ${appColors[props.theme].secondary}, 0 0 6rem ${appColors[props.theme].secondary}`};
  }
`

export const Link = styled.a`
    color: ${props => props.white ? "white" : appColors[props.theme].primarySimple};
    text-decoration: none;
    font-size: ${props => props.size ? props.size : "13px"};
    cursor: pointer;
    transition: color 0.2s;

    &:hover {
        text-decoration: underline;
        color: ${props => props.white && appColors[props.theme].primarySimple};
    }
`

export function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}