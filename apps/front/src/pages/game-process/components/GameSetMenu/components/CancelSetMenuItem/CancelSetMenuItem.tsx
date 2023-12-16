import ListItemIcon from '@mui/material/ListItemIcon'
import MenuItem from '@mui/material/MenuItem'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import { EGameSetStatus } from '@tennis-stats/types'

import { useFinishGameSetMutation, useFinishTourMutation } from '../../../../../../core/api'

import { useDeleteConfirmModal } from '../../../../../../shared/components/Modals'
import Typography from '@mui/material/Typography'


interface IProps {
    gameSetId: number
    tourId: number
    onClick: () => void
}

function CancelSetMenuItem({ gameSetId, tourId, onClick }: IProps) {
    
    const finishGameSet = useFinishGameSetMutation()
    const finishTour = useFinishTourMutation()
    
    const cancelConfirm = useDeleteConfirmModal({
        title: 'Вы действительно хотите отменить игру?',
        confirmTitle: 'Да, отменить',
        denyTitle: 'Нет, выйти'
    })
    
    const handleClick = () => {
        onClick()
        
        cancelConfirm(() => {
            finishGameSet.mutateAsync({
                id: gameSetId,
                player1Score: 0,
                player2Score: 0,
                status: EGameSetStatus.CANCELED
            }).then(() => {
                void finishTour.mutateAsync({ id: tourId })
            })
        })
    }
    
    return (
        <MenuItem onClick={handleClick}>
            <ListItemIcon>
                <HighlightOffIcon color={'error'}/>
            </ListItemIcon>
            
            <Typography color={'#CE2C31'}>Отменить сет</Typography>
        </MenuItem>
    )
    
}

export default CancelSetMenuItem