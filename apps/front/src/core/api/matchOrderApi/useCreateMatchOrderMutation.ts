import { IMatchOrder } from '@tennis-stats/types'
import { useMutation, useQueryClient } from 'react-query'
import axiosFetcher from '../axios/fetcher'


function useCreateMatchOrderMutation() {
    
    const queryClient = useQueryClient()
    
    return useMutation(
        ['generate-match-order'],
        (d) => axiosFetcher.post<IMatchOrder[]>('/matches-order/create'),
        {
            onSuccess: () => {
                void queryClient.invalidateQueries(['match-order'])
            }
        }
    )
}

export default useCreateMatchOrderMutation