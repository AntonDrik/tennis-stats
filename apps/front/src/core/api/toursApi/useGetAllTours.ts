import { ITour } from '@tennis-stats/types'
import { useQuery } from 'react-query'
import axiosFetcher from '../client/axios-fetcher'


function useGetAllTours() {
    return useQuery(
        ['get-all-tours'],
        () => axiosFetcher.get<ITour[]>('/tours')
    )
}

export default useGetAllTours