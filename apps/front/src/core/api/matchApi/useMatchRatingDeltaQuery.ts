import { TMatchRatingDelta } from '@tennis-stats/types'
import { useQuery } from 'react-query'
import axiosFetcher from '../axios/fetcher'


function useMatchOrderQuery(matchId: number) {
    return useQuery(
        [`match-rating-delta-${matchId}`],
        (d) => axiosFetcher.get<TMatchRatingDelta>(`/match/${matchId}/rating-delta`)
    )
}

export default useMatchOrderQuery
