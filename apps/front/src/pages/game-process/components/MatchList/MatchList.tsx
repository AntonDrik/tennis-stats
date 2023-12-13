import { Stack } from '@mui/material'
import { EGameSetStatus, IGameSet, ITour } from '@tennis-stats/types'
import { MatchCard, useModal } from '../../../../shared/components'
import GameModalContainer from '../../modals/GameModal/GameModalContainer'


interface IProps {
    tour: ITour
}

function MatchList({ tour }: IProps) {
    const modal = useModal()
    
    const handleRowClick = (gameSet: IGameSet, setIndex: number) => {
        if (gameSet.status !== EGameSetStatus.READY_TO_START) {
            return
        }
        
        modal.open(
            <GameModalContainer gameSet={gameSet} setIndex={setIndex}/>,
            { maxWidth: 'xl', fullWidth: true }
        )
    }

    return (
        <Stack spacing={2}>
            {
                tour.matches.map((match) => (
                    <MatchCard
                        key={match.id}
                        match={match}
                        onRowClick={handleRowClick}
                    />
                ))
            }
        </Stack>
    )
    
    
}

export default MatchList