import { GetUsersScoreDiffQuery } from '@tennis-stats/dto'
import { IUsersScoreDiff } from '@tennis-stats/types'
import queryString from 'query-string'
import { useQuery } from 'react-query'
import axiosFetcher from '../axios/fetcher'
import { TQueryOptions } from '../types'


function useUsersScoreDiffQuery(query: GetUsersScoreDiffQuery, options: TQueryOptions<IUsersScoreDiff[]>) {
    
    const params = queryString.stringify(query)
    
    return useQuery(
        [`users-score-diff`, `users-score-diff-${params}`],
        () => axiosFetcher.get<IUsersScoreDiff[]>(`/statistics/score-diff?${params}`),
        options
    )
}

export default useUsersScoreDiffQuery