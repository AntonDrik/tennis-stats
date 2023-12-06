import { Box, Button } from '@mui/material'
import { useModal } from '../../shared/components'
import { default as CreateTourModal } from './modals/CreateTourModal/CreateTourModal'


export default function GameProcessPage() {
    
    const modal = useModal()
    
    const handleClick = () => {
        modal.open(
            <CreateTourModal/>,
            { maxWidth: 'lg' }
        )
    }
    
    return (
        <Box
            width={'100%'}
            height={'100%'}
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
        >
            <Button
                variant={'contained'}
                onClick={handleClick}
            >Новая игра</Button>
        </Box>
    )
    
}