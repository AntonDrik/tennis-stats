import { Box } from '@mui/material'
import { ReactElement } from 'react'

import Sidebar from './components/Sidebar/Sidebar'
import TopBar from './components/TopBar/TopBar'
import Styled from './Wrapper.styles'


interface IProps {
    children: ReactElement
}

export default function MainWrapper({ children }: IProps) {
    
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
