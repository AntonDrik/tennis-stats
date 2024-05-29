import { Alert } from '@mui/material'
import { StrictMode } from 'react'
import * as ReactDOM from 'react-dom/client'
import App from './App'
import { fetchMe } from './core/api/usersApi/useMeQuery'
import { updateMeStore } from './core/store'


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
)

void (async function () {
    try {
        const user = await fetchMe().catch(() => null)
        updateMeStore(user)
        
        root.render(
            <StrictMode>
                <App/>
            </StrictMode>
        )
    } catch (err) {
        root.render(<Alert severity={'error'}>Error</Alert>)
    }
})()


