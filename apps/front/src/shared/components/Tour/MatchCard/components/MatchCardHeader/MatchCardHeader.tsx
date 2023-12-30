import Typography from '@mui/material/Typography'
import { IMatch } from '@tennis-stats/types'
import { useEffect } from 'react'
import Styled from './MatchCardHeader.styles'


interface IProps {
    match: IMatch
}

function MatchCardHeader({ match }: IProps) {
    
    const { user1, user2, totalScore } = match
    
    return (
        <Styled.Header>
            <Typography variant={'subtitle1'}>
                {user1.shortFullName} - {user2.shortFullName}
            </Typography>
            
            <Typography variant={'body1'} sx={{ opacity: 0.7 }}>
                Счет матча: {totalScore?.user1} - {totalScore?.user2}
            </Typography>
        </Styled.Header>
    )
    
}

export default MatchCardHeader