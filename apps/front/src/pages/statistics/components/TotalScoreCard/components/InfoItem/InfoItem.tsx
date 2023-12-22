import { Box } from '@mui/material'
import { IUsersTotalScore } from '@tennis-stats/types'

import Styled from './InfoItem.styles'


interface IProps {
    data: IUsersTotalScore
}

function InfoItem({ data }: IProps) {
    
    return (
        <Box px={1.5} flex={'auto'}>
            <Styled.InfoText variant={'body1'}>
                Всего игр: {data.totalGames}
            </Styled.InfoText>
            
            <Styled.InfoText variant={'body1'}>
                Кол-во допов: {data.additionsCount}
            </Styled.InfoText>
        </Box>
    )
    
}

export default InfoItem