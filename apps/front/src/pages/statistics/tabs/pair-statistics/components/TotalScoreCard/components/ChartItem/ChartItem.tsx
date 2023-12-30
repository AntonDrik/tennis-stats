import { Stack } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import { IUsersTotalScore } from '@tennis-stats/types'
import { useState } from 'react'

import { useUsersScoreDiffQuery } from '../../../../../../../../core/api'
import { Spinner } from '../../../../../../../../shared/components'

import Styled from './ChartItem.styles'


interface IProps {
    data: IUsersTotalScore
}


function ChartItem({ data }: IProps) {
    
    const [isOpen, setIsOpen] = useState<boolean>(false)
    
    const { data: queryData, isLoading } = useUsersScoreDiffQuery({
        user1Id: data.user1.id,
        user2Id: data.user2.id
    }, { enabled: isOpen })
    
    
    return (
        <Stack>
            
            <Styled.Content $isOpen={isOpen}>
                {(isLoading && isOpen) && <Spinner/>}
            </Styled.Content>
            
            <Styled.ButtonWrapper onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <ExpandLessIcon/> : <ExpandMoreIcon/>}
            </Styled.ButtonWrapper>
        </Stack>
    
    )
    
}


export default ChartItem