import Stack from '@mui/material/Stack'
import { ETourStatus } from '@tennis-stats/types'
import { useEffect, useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetToursQuery } from '../../core/api'
import { EAppRoutes } from '../../routes/routes.constant'
import { MatchCard, Page, Spinner, TourInfoPanel } from '../../shared/components'


type IRouteParams = {
    id: string
}

function TourPage() {
    
    const params = useParams<IRouteParams>()
    const navigate = useNavigate()
    
    const { data, isLoading } = useGetToursQuery({ id: params?.id })
    
    const tour = useMemo(() => data?.[0], [data])
    
    const pageTitle = useMemo(() => {
        return tour ? `${tour.id} Тур` : 'Тур'
    }, [tour])
    
    useEffect(() => {
        if (tour?.status === ETourStatus.ACTIVE) {
            navigate(EAppRoutes.GAME_PROCESS)
        }
    }, [tour])
    
    return (
        <Page title={pageTitle}>
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
                            <MatchCard
                                key={match.id}
                                match={match}
                            />
                        ))
                    }
                </Stack>
            }
        
        </Page>
    )
    
}


export default TourPage