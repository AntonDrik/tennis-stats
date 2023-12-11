import { IMatch } from '@tennis-stats/types'
import GameSetsTable from '../GameSetsTable/GameSetsTable'
import MatchCardHeader from '../MatchCardHeader/MatchCardHeader'
import Styled from './MatchCard.styles'


interface IProps {
    match: IMatch
}

function MatchCard({ match }: IProps) {
    
    return (
        <Styled.Wrapper>
            <MatchCardHeader match={match}/>
            
            <GameSetsTable gameSetList={match.gameSets}/>
        </Styled.Wrapper>
    )
    
}

export default MatchCard