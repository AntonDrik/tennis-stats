import ListItemIcon from '@mui/material/ListItemIcon'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import { EGameSetStatus } from '@tennis-stats/types'
import { useAtomValue } from 'jotai'

import { useFinishGameSetMutation } from '../../../../../../core/api'
import { useDeleteConfirmModal } from '../../../../../../shared/components/Modals'
import { tourPageState } from '../../../../TourPage.state'


interface IProps {
    onClick: () => void
}

function CancelSetMenuItem({ onClick }: IProps) {
    
    const { selectedMatch, selectedGameSet } = useAtomValue(tourPageState)
    
    const finishGameSet = useFinishGameSetMutation(selectedMatch?.id, selectedGameSet?.id)
    
    const cancelConfirm = useDeleteConfirmModal({
        title: 'Вы действительно хотите отменить игру?',
        confirmTitle: 'Да, отменить',
        denyTitle: 'Нет, выйти'
    })
    
    const handleClick = () => {
        onClick()
        
        cancelConfirm(() => {
            void finishGameSet.mutateAsync({
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