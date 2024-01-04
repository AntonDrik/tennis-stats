import { Stack } from '@mui/material'
import Divider from '@mui/material/Divider'
import { IUsersTotalScore } from '@tennis-stats/types'
import InfoItem from './components/InfoItem/InfoItem'
import ScoreItem from './components/ScoreItem/ScoreItem'

import Styled from './TotalScoreCard.styles'


interface IProps {
    data: IUsersTotalScore
}

function TotalScoreCard({ data }: IProps) {
    
    return (
        <Styled.CardWrapper>
            
            <Stack direction={'row'} p={0.5}>
                <ScoreItem data={data}/>
                
                <Divider orientation={'vertical'}/>
                
                <InfoItem data={data}/>
            </Stack>
    
            {/*<ChartItem data={data}/>*/}
        </Styled.CardWrapper>
    )
    
}

export default TotalScoreCard