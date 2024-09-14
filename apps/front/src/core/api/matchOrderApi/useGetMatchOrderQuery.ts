import { IMatchOrder } from '@tennis-stats/types'
import { useQuery } from 'react-query'
import axiosFetcher from '../axios/fetcher'


function useGetMatchOrderQuery() {
    return useQuery(
        ['match-order'],
        (d) => axiosFetcher.get<IMatchOrder[]>('/matches-order')
    )
}

export default useGetMatchOrderQuery