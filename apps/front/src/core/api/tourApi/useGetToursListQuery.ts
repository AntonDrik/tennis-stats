import { GetToursQuery } from '@tennis-stats/dto'
import { ITour } from '@tennis-stats/types'
import { useQuery } from 'react-query'
import queryString from 'query-string'

import axiosFetcher from '../axios/fetcher'


export function fetchToursFn(query?: GetToursQuery) {
    const params = queryString.stringify(query ?? {}, { arrayFormat: 'index' })
    
    return axiosFetcher.get<ITour[]>(`/tours?${params}`, { skipToastError: false })
}

export function useGetToursListQuery(query?: GetToursQuery) {
    
    return useQuery(
        ['get-tours', query],
        () => fetchToursFn(query),
        {
            refetchOnWindowFocus: true,
            refetchOnMount: true,
            refetchOnReconnect: true
        }
    )
}