import { Components } from '@mui/material'


const overrides: Components = {
    MuiCssBaseline: {
        styleOverrides: {
            '*': {
                boxSizing: 'border-box',
            },
            html: {
                height: '100%',
                width: '100%',
            },
            body: {
                height: '100%',
                margin: 0,
                padding: 0,
            },
            '#root': {
                height: '100%',
            },
        },
    },
    
    MuiContainer: {
        styleOverrides: {
            root: {
                paddingLeft: '15px !important',
                paddingRight: '15px !important',
                maxWidth: '1600px',
            },
        },
    },
    
    MuiButton: {
        styleOverrides: {
            root: {
                textTransform: 'none',
                boxShadow: 'none',
                '&:hover': {
                    boxShadow: 'none',
                },
            },
        },
    },
    
    MuiListItem: {
        styleOverrides: {
            root: {
                borderRadius: '9px',
            },
        },
    },
    
    MuiCard: {
        styleOverrides: {
            root: {
                borderRadius: '20px',
                padding: '14px',
                margin: '15px',
            },
        },
    },
    
    MuiListItemIcon: {
        styleOverrides: {
            root: {
                minWidth: '40px',
            },
        },
    },
    
    MuiChip: {
        styleOverrides: {
            root: {
                borderRadius: 10
            },
            colorSuccess: {
                backgroundColor: '#D6F1DF',
                color: '#218358',
                border: `1px solid #8ECEAA`
            },
            colorInfo: {
                backgroundColor: '#D5EFFF',
                color: '#0D74CE',
                border: `1px solid #8EC8F6`
            },
            colorError: {
                backgroundColor: '#FFDCD3',
                color: '#D13415',
                border: `1px solid #F5A898`
            },
            // @ts-ignore
            colorDefault: {
                backgroundColor: '#E7E9E7',
                color: '#60655F',
                border: `1px solid #CCCFCC`
            }
        }
    }
}

export default overrides