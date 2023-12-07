const overrides = {
    MuiCssBaseline: {
        styleOverrides: {
            "*": {
                boxSizing: "border-box",
            },
            html: {
                height: "100%",
                width: "100%",
            },
            body: {
                height: "100%",
                margin: 0,
                padding: 0,
            },
            "#root": {
                height: "100%",
            },
        },
    },
    MuiContainer: {
        styleOverrides: {
            root: {
                paddingLeft: "15px !important",
                paddingRight: "15px !important",
                maxWidth: "1600px",
            },
        },
    },
    
    MuiButton: {
        styleOverrides: {
            root: {
                textTransform: "none",
                boxShadow: "none",
                "&:hover": {
                    boxShadow: "none",
                },
            },
        },
    },
    
    MuiListItem: {
        styleOverrides: {
            root: {
                borderRadius: "9px",
            },
        },
    },
    
    MuiCard: {
        styleOverrides: {
            root: {
                borderRadius: "20px",
                padding: "14px",
                margin: "15px",
            },
        },
    },
    
    MuiListItemIcon: {
        styleOverrides: {
            root: {
                minWidth: "40px",
            },
        },
    },
    
    MuiGridItem: {
        styleOverrides: {
            root: {
                paddingTop: "30px",
                paddingLeft: "30px !important",
            },
        },
    },
}

export default overrides