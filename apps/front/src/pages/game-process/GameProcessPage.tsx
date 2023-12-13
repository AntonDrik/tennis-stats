import { Box, Button } from '@mui/material'
import { ETourStatus } from '@tennis-stats/types'
import { useGetToursQuery } from '../../core/api'
import { Page, Spinner, TourInfoPanel, useModal } from '../../shared/components'
import MatchList from './components/MatchList/MatchList'
import { default as CreateTourModal } from './modals/CreateTourModal/CreateTourModal'


function GameProcessPage() {
    
    const { data, isLoading } = useGetToursQuery({ status: ETourStatus.ACTIVE })
    
    const modal = useModal()
    
    const activeTour = data?.[0]
    const isDisabledButton = Boolean(activeTour) || isLoading
    
    const handleNewTourClick = () => {
        modal.open(<CreateTourModal/>, { maxWidth: 'lg' })
    }
    
    return (
        <Page title={'Игровой процесс'}>
            
            {isLoading && <Spinner page/>}
            
            <Box>
                {
                    activeTour &&
                    <TourInfoPanel tour={activeTour}/>
                }
                
                {
                    !activeTour &&
                    <Button
                        variant={'contained'}
                        sx={{mb: 3}}
                        fullWidth
                        disabled={isDisabledButton}
                        onClick={handleNewTourClick}
                    >Новая игра</Button>
                }
            </Box>
            
            {
                activeTour &&
                <MatchList tour={activeTour}/>
            }
        
        </Page>
    
    )
    
}

export default GameProcessPage