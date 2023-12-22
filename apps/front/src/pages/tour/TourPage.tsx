import Stack from '@mui/material/Stack'
import ms from 'ms'
import { useParams } from 'react-router-dom'
import { useGetTourQuery } from '../../core/api'
import { useBackButton } from '../../layouts/MainLayout'
import { appRoutes } from '../../routes/routes.constant'
import {
    GameSetsList,
    MatchCard,
    MatchCardHeader,
    Page,
    Spinner,
    TourInfoPanel
} from '../../shared/components'
import GameSetMenu from './components/GameSetMenu/GameSetMenu'


type IRouteParams = {
    id: string
}

function TourPage() {
    
    const params = useParams<IRouteParams>()
    
    const { data: tour, isLoading } = useGetTourQuery(params?.id ?? 0, {
        refetchInterval: ms('5s')
    })
    
    useBackButton({
        title: 'К списку туров',
        link: appRoutes.TOURS_LIST
    })
    
    return (
        <Page title={tour ? `${tour.id} Тур` : 'Тур'}>
            {isLoading && <Spinner page/>}
            
            {
                tour &&
                <TourInfoPanel tour={tour}/>
            }
            
            {
                tour &&
                <Stack spacing={3}>
                    {
                        tour.matches.map((match) => (
                            <MatchCard key={match.id}>
                                <MatchCardHeader match={match}/>
                                
                                <GameSetsList
                                    gameSetList={match.gameSets}
                                    renderMenuCell={(gameSet) => (
                                        <GameSetMenu
                                            match={match}
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


export default TourPage