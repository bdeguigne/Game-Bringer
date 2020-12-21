import { createMuiTheme } from '@material-ui/core/styles';

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
                "&:hover": {
                    boxShadow: "0px 5px 20px -10px rgba(255,255,255, 0.50);"
                }
            },
            textSecondary: {
                fontFamily: "Montserrat, sans-serif",
                // Some CSS
                backgroundColor: '#6D5DD3',
                borderRadius: 10,
                // border: 0,
                color: 'white',
                height: 60,
                padding: '0 45px',
                // border: "0.12em solid rgba(255,255,255,0)",
                backgroundClip: "padding-box",
                textDecoration: "none",
                // boxSizing: "border-box",
                "&:hover": {
                    backgroundColor: "#5c4faf"
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
                color: 'rgba(255, 255, 255, 0.54)',
                "&:hover": {
                    backgroundColor: "#58606c54"
                }
            }
        },
        MuiTooltip: {
            tooltip: {
                fontFamily: "Montserrat, sans-serif",
                backgroundColor: "#6d5dd3"
            }
        }
    }
});