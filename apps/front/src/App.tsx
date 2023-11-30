import React, { ReactElement } from 'react'
import AppRoutes from './routes/routes'
import GlobalStyles from './theme/globalStyles'
import ThemeConfig from './theme/themeConfig'


export default function App(): ReactElement {
    
    return (
        <ThemeConfig>
            <GlobalStyles/>
            <AppRoutes/>
        </ThemeConfig>
    )
}
