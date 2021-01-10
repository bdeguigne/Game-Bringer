import { createMuiTheme } from '@material-ui/core/styles';
import {
    appColors,
    sideNavPaddingLeft,
    toolTipBoxShadow,
    genresNeonBoxShadow,
    genresNeonBoxShadowHover,
    PrimaryNeonBoxShadow, PrimaryNeonBoxShadowHover
} from "./utils/styles";

export default createMuiTheme({
    overrides: {
        // Style sheet name ⚛️
        MuiButton: {
            // Name of the rule
            textPrimary: {
                fontFamily: "Montserrat, sans-serif",
                background: 'linear-gradient(90deg, #FC5D44 0%, #FEAA45 100%)',
                borderRadius: 10,
                color: 'white',
                height: 60,
                padding: '0 45px',
                backgroundClip: "padding-box",
                textDecoration: "none",
                boxShadow: PrimaryNeonBoxShadow,
                border: "0.5px solid transparent",
                "&:hover": {
                    border: "0.5px solid white",
                    boxShadow: PrimaryNeonBoxShadowHover
                }
            },
            textSecondary: {
                fontFamily: "Montserrat, sans-serif",
                backgroundColor: appColors.backgroundContrast,
                borderRadius: 10,
                color: 'white',
                height: 60,
                padding: '0 45px',
                border: "0.5px solid transparent",
                backgroundClip: "padding-box",
                textDecoration: "none",
                boxShadow: genresNeonBoxShadow,
                // boxSizing: "border-box",
                "&:hover": {
                    border: "0.5px solid white",
                    backgroundColor: appColors.backgroundContrast,
                    boxShadow: genresNeonBoxShadowHover
                }
            }

        },
        MuiChip: {
            clickableColorPrimary: {
                fontFamily: "Montserrat, sans-serif",
                color: "white",
                background: 'linear-gradient(90deg, #FC5D44 0%, #FEAA45 100%)',
            },
            clickableColorSecondary: {
                fontFamily: "Montserrat, sans-serif",
                color: "white",
                backgroundColor: "rgb(109, 93, 211)",
                "&:hover": {
                    backgroundColor: "rgb(91, 79, 165)"
                }
            }

        },
        MuiCircularProgress: {
            colorPrimary: {
                color: "#FEAA45"
            }
        },
        MuiTypography: {
            caption: {
                fontFamily: "Montserrat, sans-serif",
                color: "white",
            }
        },
        typography: {
            fontFamily: [
                'Montserrat, sans-serif'
            ]
        },
        MuiInputBase: {
            root: {
                fontFamily: "Montserrat, sans-serif",
                color: "white"
            }
        },
        MuiIconButton: {
            root: {
                color: appColors["600"],
                "&:hover": {
                    backgroundColor: appColors.hover
                }
            }
        },
        MuiTooltip: {
            tooltip: {
                fontFamily: "Montserrat, sans-serif",
                backgroundColor: appColors.backgroundContrast ,
                boxShadow: toolTipBoxShadow
            },
            tooltipArrow: {
                borderRadius: "16px",
                padding: "0",
                boxShadow: "0px 0px 0.7rem -4px #fff, 0 0 2rem -20px rgb(109,93,211), inset 12px -20px 2rem -45px rgb(109,93,211), 0 0 4rem -39px rgb(109,93,211)"
            },
            arrow: {
                color: appColors.backgroundColor,
            }
        },
        MuiTabs: {
            root: {
                width: "100%",
            },
            flexContainer: {
                paddingTop: "16px",
                paddingBottom: "16px",
            },
            indicator: {
                // width: "100%",
                backgroundColor: appColors.primarySimple,
                boxShadow: "rgb(255 255 255) 0px 0px 20px 0px, rgb(254,170,69) 0px 0px 20px 1px;"
            }
        },
        MuiTab: {
            root: {
                fontFamily: "Montserrat, sans-serif",
                minWidth: 0,
                // borderRadius: 10,
                padding: `12px 0px 12px ${sideNavPaddingLeft} !important`,
                textTransform: "inherit",
                fontSize: "1rem",
                transition: "0.3s ease",
                "&:hover": {
                    backgroundColor: appColors.hover
                }
            },
            wrapper: {
                // minWidth: "50px",
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "flex-start"
            },
            labelIcon: {
                // paddingLeft: "22px !important",
                minHeight: "48px",
            },
            textColorInherit: {
                color: appColors["600"],
            }

        }
    }
});