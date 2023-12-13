import { ITour } from '@tennis-stats/types'
import { useQuery } from 'react-query'

import axiosFetcher from '../axios/fetcher'


function useGetTourQuery(id: string | undefined) {
    return useQuery(
        [`get-tour`],
        () => axiosFetcher.get<ITour>(`/tour/${id}`),
        {
            refetchOnMount: true
        }
    )
}

export default useGetTourQuery