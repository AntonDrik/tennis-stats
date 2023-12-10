import { GetToursQuery } from '@tennis-stats/dto'
import { ITour } from '@tennis-stats/types'
import { useQuery } from 'react-query'
import queryString from 'query-string'

import axiosFetcher from '../client/axios-fetcher'


function useGetTours(query: GetToursQuery) {
    
    const params = queryString.stringify(query, { arrayFormat: 'index' })
    
    return useQuery(
        [`get-tours-${params}`],
        () => axiosFetcher.get<ITour[]>(`/tours?${params}`)
    )
}

export default useGetTours