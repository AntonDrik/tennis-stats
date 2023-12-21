import { Typography } from '@mui/material'
import { IUsersTotalScore } from '@tennis-stats/types'

import Styled from './TotalScoreCard.styles'


interface IProps {
    data: IUsersTotalScore
}

function TotalScoreCard({ data }: IProps) {
    
    return (
        <Styled.CardWrapper>
            <Typography fontWeight={700}>{data.usersLabel}</Typography>
            
            <Styled.SecondaryText mt={1} variant={'subtitle2'}>
                Общий счет: {data.user1Score}:{data.user2Score}
            </Styled.SecondaryText>
            
            <Styled.SecondaryText variant={'subtitle2'}>
                Количество игр: {data.totalGames}
            </Styled.SecondaryText>
        </Styled.CardWrapper>
    )
    
}

export default TotalScoreCard