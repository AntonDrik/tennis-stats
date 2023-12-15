import { Stack } from '@mui/material'
import { EGameSetStatus, IGameSet, ITour } from '@tennis-stats/types'
import { useFinishTourMutation } from '../../../../core/api'
import useFinishGameSetMutation from '../../../../core/api/gameSetsApi/useFinishGameSetMutation'
import { MatchCard, useModal } from '../../../../shared/components'
import { useDeleteConfirmModal } from '../../../../shared/components/Modals'
import GameModalContainer from '../../modals/GameModal/GameModalContainer'


interface IProps {
    tour: ITour
}

function MatchList({ tour }: IProps) {
    
    const cancelGameSet = useFinishGameSetMutation()
    const finishTour = useFinishTourMutation()
    
    const modal = useModal()
    const deleteConfirm = useDeleteConfirmModal({
        title: 'Вы действительно хотите отменить игру?',
        confirmTitle: 'Да, отменить',
        denyTitle: 'Нет, выйти'
    })
    
    const handleRowClick = (gameSet: IGameSet, setIndex: number) => {
        if (![EGameSetStatus.READY_TO_START, EGameSetStatus.IN_PROCESS].includes(gameSet.status)) {
            return
        }
        
        modal.open(
            <GameModalContainer gameSet={gameSet} setIndex={setIndex}/>,
            { maxWidth: 'xl', fullWidth: true }
        )
    }
    
    const handleCancelClick = (gameSet: IGameSet) => {
        deleteConfirm(() => {
            
            cancelGameSet.mutateAsync({
                id: gameSet.id,
                status: EGameSetStatus.CANCELED
            }).then(() => {
                void finishTour.mutateAsync({ id: tour.id })
            })
            
        })
    }
    
    return (
        <Stack spacing={2}>
            {
                tour.matches.map((match) => (
                    <MatchCard
                        key={match.id}
                        match={match}
                        onRowClick={handleRowClick}
                        onCancelClick={handleCancelClick}
                    />
                ))
            }
        </Stack>
    )
    
    
}

export default MatchList