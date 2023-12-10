import { Box, Button } from '@mui/material'
import { ETourStatus } from '@tennis-stats/types'
import { useGetTours } from '../../core/api'
import { Page, Spinner, useModal } from '../../shared/components'
import MatchTable from './components/MatchTable/MatchTable'
import TourControlPanel from './components/TourControlPanel/TourControlPanel'
import { default as CreateTourModal } from './modals/CreateTourModal/CreateTourModal'


export default function GameProcessPage() {
    
    const { data, isLoading } = useGetTours({ status: ETourStatus.ACTIVE })
    
    const modal = useModal()
    
    const activeTour = data?.[0]
    const isDisabledButton = Boolean(activeTour) || isLoading
    
    const handleClick = () => {
        modal.open(<CreateTourModal/>, { maxWidth: 'lg' })
    }
    
    return (
        <Page title={'Игровой процесс'}>
            
            {isLoading && <Spinner page/>}
            
            <Box>
                {
                    activeTour &&
                    <TourControlPanel activeTour={activeTour}/>
                }
                
                <Button
                    variant={'contained'}
                    fullWidth
                    disabled={isDisabledButton}
                    onClick={handleClick}
                >Новая игра</Button>
            </Box>
            
            {
                activeTour &&
                <MatchTable activeTour={activeTour}/>
            }
        
        </Page>
    
    )
    
}