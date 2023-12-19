import Stack from '@mui/material/Stack'
import { useSetAtom } from 'jotai'
import ms from 'ms'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useGetTourQuery } from '../../core/api'
import { appRoutes } from '../../routes/routes.constant'
import {
    GameSetsList,
    MatchCard,
    MatchCardHeader,
    Page,
    Spinner,
    TourInfoPanel,
    backButtonAtom
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
    
    const setBackButton = useSetAtom(backButtonAtom)
    
    useEffect(() => {
        setBackButton({
            title: 'К списку туров',
            link: appRoutes.TOURS_LIST
        })
        
        return () => {
            setBackButton(null)
        }
    }, [])
    
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
                                        <GameSetMenu gameSet={gameSet}/>
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