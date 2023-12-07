import { Box } from '@mui/material'
import { ReactElement } from 'react'

import Sidebar from './components/Sidebar/Sidebar'
import Styled from './Wrapper.styles'


interface IProps {
    children: ReactElement
}

export default function MainWrapper({ children }: IProps) {
    
    return (
        <Box display={'flex'}>
            
            <Sidebar/>
            
            <Styled.Content $sidebarWidth={65}>
                {children}
            </Styled.Content>
        </Box>
    )
}
