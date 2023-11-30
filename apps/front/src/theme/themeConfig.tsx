import { CssBaseline } from '@mui/material'
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles'
import React, { ReactNode } from 'react'
import theme from './theme'

interface IProps {
    children: ReactNode;
}

export default function ThemeConfig({ children }: IProps): JSX.Element {
    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                {children}
            </ThemeProvider>
        </StyledEngineProvider>
    )
}
