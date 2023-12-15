import { IGameSet, IMatch } from '@tennis-stats/types'
import GameSetsTable from './components/GameSetsTable/GameSetsTable'
import MatchCardHeader from './components/MatchCardHeader/MatchCardHeader'
import Styled from './MatchCard.styles'


interface IProps {
    match: IMatch
    onRowClick?: (gameSet: IGameSet, setIndex: number) => void
    onCancelClick?: (gameSet: IGameSet, setIndex: number) => void
}

function MatchCard({ match, onRowClick, onCancelClick }: IProps) {
    
    return (
        <Styled.Wrapper>
            <MatchCardHeader match={match}/>
            
            <GameSetsTable
                gameSetList={match.gameSets}
                onRowClick={onRowClick}
                onCancelClick={onCancelClick}
            />
        </Styled.Wrapper>
    )
    
}

export default MatchCard