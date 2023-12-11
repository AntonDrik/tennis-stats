import { Box, Button } from '@mui/material'
import { ETourStatus } from '@tennis-stats/types'
import { useGetToursQuery } from '../../core/api'
import { Page, Spinner, useModal } from '../../shared/components'
import MatchList from './components/MatchList/MatchList'
import TourControlPanel from './components/TourControlPanel/TourControlPanel'
import { default as CreateTourModal } from './modals/CreateTourModal/CreateTourModal'


export default function GameProcessPage() {
    
    const { data, isLoading } = useGetToursQuery({ status: ETourStatus.ACTIVE })
    
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
                
                {
                    !activeTour &&
                    <Button
                        variant={'contained'}
                        sx={{mb: 3}}
                        fullWidth
                        disabled={isDisabledButton}
                        onClick={handleClick}
                    >Новая игра</Button>
                }
            </Box>
            
            {
                activeTour &&
                <MatchList activeTour={activeTour}/>
            }
        
        </Page>
    
    )
    
}