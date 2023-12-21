import { IUsersTotalScore } from '@tennis-stats/types'
import queryString from 'query-string'
import { useQuery } from 'react-query'
import axiosFetcher from '../axios/fetcher'


interface IArgs {
    startDate: string,
    endDate: string
}

function useUsersTotalScoreQuery(args: IArgs | null) {
    
    const params = args ? `?${queryString.stringify(args)}` : ''
    
    
    return useQuery<IUsersTotalScore[]>(
        [`users-total-score`, `users-total-score-${params}`],
        (d) => axiosFetcher.get(`/statistics/total-score${params}`)
    )
}

export default useUsersTotalScoreQuery