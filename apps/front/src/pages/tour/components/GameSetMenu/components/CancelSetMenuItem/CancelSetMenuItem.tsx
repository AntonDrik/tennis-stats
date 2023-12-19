import ListItemIcon from '@mui/material/ListItemIcon'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import { EGameSetStatus } from '@tennis-stats/types'

import { useFinishGameSetMutation } from '../../../../../../core/api'
import { useDeleteConfirmModal } from '../../../../../../shared/components/Modals'


interface IProps {
    gameSetId: number
    onClick: () => void
}

function CancelSetMenuItem({ gameSetId, onClick }: IProps) {
    
    const finishGameSet = useFinishGameSetMutation()
    
    const cancelConfirm = useDeleteConfirmModal({
        title: 'Вы действительно хотите отменить игру?',
        confirmTitle: 'Да, отменить',
        denyTitle: 'Нет, выйти'
    })
    
    const handleClick = () => {
        onClick()
        
        cancelConfirm(() => {
            void finishGameSet.mutateAsync({
                id: gameSetId,
                player1Score: 0,
                player2Score: 0,
                status: EGameSetStatus.CANCELED
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