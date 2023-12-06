import React, { ReactElement } from 'react'
import { QueryClientProvider } from 'react-query'
// import { ReactQueryDevtools } from 'react-query/devtools'

import { queryClient } from './core/api'
import AppRoutes from './routes/routes'
import GlobalStyles from './theme/globalStyles'
import ThemeConfig from './theme/themeConfig'


export default function App(): ReactElement {
    
    return (
        <ThemeConfig>
            <QueryClientProvider client={queryClient}>
                <GlobalStyles/>
                <AppRoutes/>
                
                {/*<ReactQueryDevtools initialIsOpen={true}/>*/}
            </QueryClientProvider>
        </ThemeConfig>
    )
}
