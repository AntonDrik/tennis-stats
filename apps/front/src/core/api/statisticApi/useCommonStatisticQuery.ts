import { ICommonStatistic } from '@tennis-stats/types'
import { useQuery } from 'react-query'
import axiosFetcher from '../axios/fetcher'


function useCommonStatisticQuery() {

    return useQuery(
        ['components-statistic'],
        () => axiosFetcher.get<ICommonStatistic>(`/statistic/common`)
    )
}

export default useCommonStatisticQuery
