import { IAllGamesStats } from '@tennis-stats/types'
import { useQuery } from 'react-query'
import axiosFetcher from '../axios/fetcher'


function useAllGamesStatsQuery() {
    
    return useQuery(
        ['all-games-stats'],
        () => axiosFetcher.get<IAllGamesStats>(`/statistics/all-games`)
    )
}

export default useAllGamesStatsQuery