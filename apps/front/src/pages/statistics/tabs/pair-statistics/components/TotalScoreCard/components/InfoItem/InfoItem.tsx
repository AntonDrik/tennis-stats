import { Box } from '@mui/material'
import { IPairStatistic } from '@tennis-stats/types'

import Styled from './InfoItem.styles'


interface IProps {
    data: IPairStatistic
}

function InfoItem({ data }: IProps) {
    
    return (
        <Box px={1.5} flex={'auto'}>
            <Styled.InfoText variant={'body1'}>
                Всего игр: {data.gamesCount}
            </Styled.InfoText>
            
            <Styled.InfoText variant={'body1'}>
                Кол-во допов: {data.additionsCount}
            </Styled.InfoText>
        </Box>
    )
    
}

export default InfoItem