import { Box } from '@mui/material'
import { useAtomValue } from 'jotai'
import { ReactElement } from 'react'

import Sidebar from './components/Sidebar/Sidebar'
import { sidebarAtom } from './components/Sidebar/Sidebar.state'
import Styled from './Wrapper.styles'


interface IProps {
    children: ReactElement
}

export default function MainWrapper({ children }: IProps) {
    
    const sidebar = useAtomValue(sidebarAtom)
    
    return (
        <Box display={'flex'}>
            
            <Sidebar/>
            
            <Styled.Content $sidebarWidth={sidebar.width}>
                {children}
            </Styled.Content>
        </Box>
    )
}
