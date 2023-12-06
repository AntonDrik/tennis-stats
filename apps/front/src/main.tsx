import { Alert } from '@mui/material'
import { StrictMode } from 'react'
import * as ReactDOM from 'react-dom/client'
import App from './App'


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
)

void (async function () {
    try {
        root.render(
            <StrictMode>
                <App/>
            </StrictMode>
        )
    } catch (err) {
        root.render(<Alert severity={'error'}>Error</Alert>)
    }
})()


