import { Stack } from '@mui/material'
import Divider from '@mui/material/Divider'
import { IUsersTotalScore } from '@tennis-stats/types'
import Styled from './ScoreItem.styles'


interface IProps {
    data: IUsersTotalScore
}

function ScoreItem({ data }: IProps) {
    const { user1, user2 } = data
    
    return (
        
        <Styled.Wrapper direction={'row'}>
            
            <Stack alignItems={'center'} minWidth={40}>
                <Styled.ScoreText>{data.user1.score}</Styled.ScoreText>
                <Divider flexItem/>
                <Styled.ScoreText>{data.user2.score}</Styled.ScoreText>
            </Stack>
            
            <Divider orientation={'vertical'}/>
            
            <Styled.NamesWrapper>
                <Styled.UserNameText>{user1.shortName}</Styled.UserNameText>
                <Divider flexItem/>
                <Styled.UserNameText>{user2.shortName}</Styled.UserNameText>
            </Styled.NamesWrapper>
        
        </Styled.Wrapper>
    
    )
    
}


export default ScoreItem