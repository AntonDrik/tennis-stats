import { Stack } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import { IPairStatistic } from '@tennis-stats/types'
import { useState } from 'react'

import Styled from './ChartItem.styles'


interface IProps {
    data: IPairStatistic
}


function ChartItem({ data }: IProps) {
    
    const [isOpen, setIsOpen] = useState<boolean>(false)
    
    
    return (
        <Stack>
            
            <Styled.Content $isOpen={isOpen}>
                1
            </Styled.Content>
            
            <Styled.ButtonWrapper onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <ExpandLessIcon/> : <ExpandMoreIcon/>}
            </Styled.ButtonWrapper>
        </Stack>
    
    )
    
}


export default ChartItem