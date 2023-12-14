import CancelIcon from '@mui/icons-material/Cancel'
import { IconButton, Stack } from '@mui/material'
import { ITour } from '@tennis-stats/types'
import { toast } from 'react-hot-toast'
import { useCancelTourMutation } from '../../../../../../core/api'
import { useDeleteConfirmModal } from '../../../../Modals'


interface IProps {
    tour: ITour
}

function ButtonsBlock({ tour }: IProps) {
    
    const { mutateAsync } = useCancelTourMutation()
    
    const openConfirmModal = useDeleteConfirmModal({
        title: `Вы действительно хотите завершить ${tour.id} тур`,
        confirmTitle: 'Да, завершить',
        denyTitle: 'Нет, отменить'
    })
    
    const handleCancelClick = () => {
        openConfirmModal(() => deleteTour())
    }
    
    const deleteTour = () => {
        void mutateAsync({ id: tour.id })
            .then(() => {
                toast.success(`${tour.id} Тур отменен`)
            })
    }
    
    return (
        <Stack direction={'row'} spacing={1}>
            <IconButton
                size={'small'}
                onClick={handleCancelClick}
            >
                <CancelIcon sx={{ color: '#E5484D' }}/>
            </IconButton>
        </Stack>
    )
    
}

export default ButtonsBlock