import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { appRoutes } from '../../../../routes/routes.constant'
import { useModal } from '../../../../shared/components'
import CreateTourModal from '../../modals/CreateTourModal/CreateTourModal'


function NewTourButton() {
    
    const modal = useModal()
    const navigate = useNavigate()
    
    const handleNewTourClick = () => {
        modal.open(
            <CreateTourModal
                onCreateTour={(tour) => {
                    navigate(appRoutes.TOUR_BY_ID(tour.id))
                }}
            />
        )
    }
    
    return (
        <Button
            variant={'contained'}
            sx={{ mb: 3 }}
            fullWidth
            onClick={handleNewTourClick}
        >Новый тур</Button>
    )
    
}


export default NewTourButton