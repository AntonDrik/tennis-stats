import { Button, Stack } from '@mui/material'
import { ETourStatus } from '@tennis-stats/types'
import { useGetToursQuery } from '../../core/api'
import {
    GameSetsList,
    MatchCard,
    MatchCardHeader,
    Page,
    Spinner,
    TourInfoPanel,
    useModal
} from '../../shared/components'
import GameSetMenu from './components/GameSetMenu/GameSetMenu'
import { default as CreateTourModal } from './modals/CreateTourModal/CreateTourModal'


function GameProcessPage() {
    
    const { data, isLoading } = useGetToursQuery({ status: ETourStatus.ACTIVE })
    
    const modal = useModal()
    
    const activeTour = data?.[0]
    const isDisabledButton = Boolean(activeTour) || isLoading
    
    const handleNewTourClick = () => {
        modal.open(<CreateTourModal/>, { maxWidth: 'lg', fullWidth: true })
    }
    
    if (!activeTour && !isLoading) {
        return (
            <Page title={'Игровой процесс'}>
                <Button
                    variant={'contained'}
                    sx={{ mb: 3 }}
                    fullWidth
                    disabled={isDisabledButton}
                    onClick={handleNewTourClick}
                >Новая игра</Button>
            </Page>
        )
    }
    
    return (
        <Page title={'Игровой процесс'}>
            {isLoading && <Spinner page/>}
            
            {
                activeTour &&
                <TourInfoPanel tour={activeTour}/>
            }
            
            {
                activeTour &&
                <Stack spacing={2}>
                    {
                        activeTour.matches.map((match) => (
                            <MatchCard key={match.id}>
                                <MatchCardHeader match={match}/>
                                
                                <GameSetsList
                                    gameSetList={match.gameSets}
                                    renderMenuCell={(gameSet) => (
                                        <GameSetMenu
                                            tour={activeTour}
                                            gameSet={gameSet}
                                        />
                                    )}
                                />
                            </MatchCard>
                        ))
                    }
                </Stack>
            }
        </Page>
    )
    
}

export default GameProcessPage