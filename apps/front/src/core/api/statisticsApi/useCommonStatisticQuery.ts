import { ICommonStatistic } from '@tennis-stats/types'
import { useQuery } from 'react-query'
import axiosFetcher from '../axios/fetcher'


function useCommonStatisticQuery() {
    
    return useQuery(
        ['common-statistic'],
        () => axiosFetcher.get<ICommonStatistic>(`/statistic/common`)
    )
}

export default useCommonStatisticQuery