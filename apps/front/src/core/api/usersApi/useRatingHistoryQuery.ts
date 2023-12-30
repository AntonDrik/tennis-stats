import { IAvgRatingByDay } from '@tennis-stats/types'
import { useQuery } from 'react-query'
import axiosFetcher from '../axios/fetcher'


function useRatingHistoryQuery() {
    return useQuery<IAvgRatingByDay[]>(
        ['rating-history'],
        () => axiosFetcher.get<IAvgRatingByDay[]>('/rating-history')
    )
}

export default useRatingHistoryQuery