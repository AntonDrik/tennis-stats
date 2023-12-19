import { ITour } from '@tennis-stats/types'
import { useQuery } from 'react-query'

import axiosFetcher from '../axios/fetcher'
import { TQueryOptions } from '../types'


function useGetTourQuery(id: string | number, options?: TQueryOptions<ITour>) {
    return useQuery(
        [`get-tour`, `tour-${String(id)}`],
        () => axiosFetcher.get<ITour>(`/tours/${id}`),
        options
    )
}

export default useGetTourQuery