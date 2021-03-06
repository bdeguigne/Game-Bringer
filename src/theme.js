import { createMuiTheme } from '@material-ui/core/styles';
import {
    appColors,
} from "./utils/styles";

export default function muiTheme(theme) {
    return createMuiTheme({
        palette: {
            type: "dark",
            primary: {
                main: appColors[theme].primarySimple,
            },
            secondary: {
                main: appColors[theme].secondary
            }
        },
        overrides: {
            // Style sheet name ⚛️
            MuiButton: {
                // Name of the rule
                textPrimary: {
                    fontFamily: "Montserrat, sans-serif",
                    background: appColors[theme].primary,
                    borderRadius: 10,
                    color: 'white',
                    height: 60,
                    padding: '0 45px',
                    backgroundClip: "padding-box",
                    textDecoration: "none",
                    boxShadow: `0px 0px 64px -23px ${appColors[theme].primarySimple};`,
                    border: "0.5px solid transparent",
                    "&:hover": {
                        border: "0.5px solid white",
                        boxShadow: `0px 0px 64px -15px ${appColors[theme].primarySimple}, 0px 0px 32px -14px #FFFFFF, inset 0px 0px 32px -14px #FFFFFF;`
                    }
                },
                textSecondary: {
                    fontFamily: "Montserrat, sans-serif",
                    backgroundColor: appColors[theme].backgroundContrast,
                    borderRadius: 10,
                    color: 'white',
                    height: 60,
                    padding: '0 45px',
                    border: "0.5px solid transparent",
                    backgroundClip: "padding-box",
                    textDecoration: "none",
                    boxShadow: `0px 0px 5px -15px ${appColors[theme].secondary}, 0px 0px 2px #FFFFFF`,
                    "&:hover": {
                        border: "0.5px solid white",
                        backgroundColor: appColors[theme].backgroundContrast,
                        boxShadow: `0px 0px 64px -3px ${appColors[theme].secondary}, 0px 0px 21px -4px #FFFFFF, inset 0px 0px 12px -15px ${appColors[theme].secondary};`
                    }
                }

            },
            MuiChip: {
                colorPrimary: {
                    borderRadius: "8px",
                },
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
                    color: appColors[theme].primarySimple
                }
            },
            MuiTypography: {
                caption: {
                    fontFamily: "Montserrat, sans-serif",
                    color: "white",
                },
                body1: {
                    fontFamily: "Montserrat, sans-serif",
                    fontSize: "12px"
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
                        backgroundColor: appColors[theme].hover
                    }
                }
            },
            MuiTooltip: {
                tooltip: {
                    fontFamily: "Montserrat, sans-serif",
                    backgroundColor: appColors[theme].backgroundContrast,
                    boxShadow: `0px 0px 0.5rem -4px #fff, 0 0 2rem 0px ${appColors[theme].secondary}, inset 12px -20px 2rem -45px ${appColors[theme].secondary}, 0 0 4rem -39px ${appColors[theme].secondary};`
                },
                tooltipArrow: {
                    borderRadius: "16px",
                    padding: "0",
                    boxShadow: `0px 0px 0.7rem -4px #fff, 0 0 2rem -20px ${appColors[theme].secondary}, inset 12px -20px 2rem -45px ${appColors[theme].secondary}, 0 0 4rem -39px ${appColors[theme].secondary}`
                },
                arrow: {
                    color: appColors[theme].backgroundColor,
                }
            },
            MuiTabs: {

                flexContainer: {
                    paddingTop: "16px",
                    paddingBottom: "16px",
                },
                indicator: {
                    backgroundColor: appColors[theme].primarySimple,
                    boxShadow: "rgb(255 255 255) 0px 0px 20px 0px, rgb(254,170,69) 0px 0px 5px 0px;"
                }
            },
            MuiTab: {
                root: {
                    fontFamily: "Montserrat, sans-serif",
                    textTransform: "inherit",
                    fontSize: "1rem",
                    transition: "0.3s ease",
                    "&:hover": {
                        backgroundColor: appColors[theme].hover
                    }
                },
                wrapper: {
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "row",
                    justifyContent: "flex-start"
                },
                labelIcon: {
                    minHeight: "48px",
                },
                textColorInherit: {
                    color: appColors["600"],
                }

            },
            MuiOutlinedInput: {
                input: {
                    padding: "12.5px 14px"
                }
            },
            MuiCheckbox: {
                colorPrimary: {
                    color: appColors[theme].primarySimple,
                    "&$checked": {
                        color: appColors[theme].primarySimple,
                    }
                },
                colorSecondary: {
                    "&$checked": {
                        color: appColors[theme].secondary,
                    }
                },
            },
            MuiFormControlLabel: {
                root: {
                    padding: 0
                }
            },
            MuiSlider: {
                valueLabel: {
                    fontFamily: "Montserrat, sans-serif",
                }
            },
            MuiFormLabel: {
                root: {
                    fontFamily: "Montserrat, sans-serif",
                }
            },
            MuiTreeItem: {
                root: {
                    border: `1px solid ${appColors[theme].filtersBackgroundColor}`,
                    "&$selected > .MuiTreeItem-content .MuiTreeItem-label": {
                        backgroundColor: appColors[theme].secondaryDarker + "!important"
                    },

                },
                content: {
                    position: "relative"
                },
                label: {
                    background: appColors[theme].filtersBackgroundColor,
                    padding: "4px 4px 4px 6px !important",
                    "&:hover": {
                        backgroundColor: appColors[theme].secondaryTransparent + "!important"
                    },
                },
                iconContainer: {
                    position: "absolute",
                    right: 0,
                    zIndex: 1
                },
                group: {
                    marginLeft: 0,
                },

            },
            MuiAutocomplete: {
                paper: {
                    fontFamily: "Montserrat, sans-serif",
                    backgroundColor: appColors[theme].backgroundContrast,
                }
            },
            MuiDrawer: {
                paper: {
                    padding: "8px",
                    boxShadow: `0px 0px 0.5rem -4px #fff, 0 0 2rem 0px ${appColors[theme].secondary}, inset 12px -20px 2rem -45px ${appColors[theme].secondary}, 0 0 4rem -39px ${appColors[theme].secondary};`,
                }
            },
            MuiPaper: {
                root: {
                    backgroundColor: appColors[theme].backgroundContrast,
                    boxShadow: `0px 0px 64px -24px ${appColors[theme].secondary}, 0px 0px 8px #FFFFFF, inset 0px 0px 32px -15px ${appColors[theme].secondary} !important;`
                }
            },
            MuiButtonBase: {
                root: {
                    fontFamily: "Montserrat, sans-serif",
                }
            },
            MuiDialog: {
                paperWidthSm: {
                    maxWidth: "1100px"
                }
            }, 
            MuiAccordion: {
                root: {
                    zIndex: 3,
                    border: "1px solid",
                    boxShadow: `0px 0px 18px -8px ${appColors[theme].secondary}, 0px 0px 4px #FFFFFF !important`,
                }
            },
            MuiAccordionSummary: {
                root: {
                    transition: "background-color 0.3s",
                    "&:hover": {
                        backgroundColor: appColors[theme].hover + "!important"
                    },
                }
            },
            MuiAccordionDetails: {
                root: {
                    transition: "background-color 0.3s",
                    "&:hover": {
                        backgroundColor: appColors[theme].hover + "!important"
                    },
                }
            }

        }
    });
}
