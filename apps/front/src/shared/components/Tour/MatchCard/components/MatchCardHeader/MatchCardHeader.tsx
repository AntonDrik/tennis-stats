import Typography from '@mui/material/Typography'
import { IMatch } from '@tennis-stats/types'
import Styled from './MatchCardHeader.styles'


interface IProps {
    match: IMatch
}

function MatchCardHeader({ match }: IProps) {
    
    const {player1, player2, matchScore} = match
    
    return (
        <Styled.Header>
            <Typography variant={'subtitle1'}>
                {player1.user.shortFullName} - {player2.user.shortFullName}
            </Typography>
            
            <Typography variant={'body1'} sx={{opacity: 0.7}}>
                Счет матча: {matchScore}
            </Typography>
        </Styled.Header>
    )
    
}

export default MatchCardHeader