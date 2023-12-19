import { Box } from '@mui/material'
import { ReactElement, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { appRoutes } from '../../routes/routes.constant'

import Sidebar from './components/Sidebar/Sidebar'
import TopBar from './components/TopBar/TopBar'
import Styled from './MainLayout.styles'


interface IProps {
    children: ReactElement
}

function MainLayout({ children }: IProps) {
    
    const navigate = useNavigate()
    
    useEffect(() => {
        const isLoggedIn = localStorage.getItem('isLoggedIn')
        
        if (isLoggedIn !== 'true') {
            navigate(appRoutes.LOGIN)
        }
    }, [])
    
    return (
        <Box display={'flex'}>
            
            <TopBar/>
            
            <Sidebar/>
            
            <Styled.Content>
                {children}
            </Styled.Content>
        </Box>
    )
}

export default MainLayout