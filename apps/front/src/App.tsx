import React, { ReactElement } from 'react'
import { QueryClientProvider } from 'react-query'

import { queryClient } from './core/api'
import AppRoutes from './routes/routes'
import { ModalContainer } from './shared/components'
import GlobalStyles from './theme/globalStyles'
import ThemeConfig from './theme/themeConfig'


export default function App(): ReactElement {
    
    return (
        <ThemeConfig>
            <QueryClientProvider client={queryClient}>
                <GlobalStyles/>
                <AppRoutes/>
                <ModalContainer/>
            </QueryClientProvider>
        </ThemeConfig>
    )
}
