import { IdDto } from '@tennis-stats/dto'
import { ITour } from '@tennis-stats/types'
import { useMutation, useQueryClient } from 'react-query'
import axiosFetcher from '../axios/fetcher'


function useCancelTourMutation() {
    
    const queryClient = useQueryClient()
    
    return useMutation(
        'cancel-tour',
        (dto: IdDto) => axiosFetcher.post<ITour, IdDto>('/tours/cancel', dto),
        {
            onSuccess: () => {
                void queryClient.invalidateQueries({ queryKey: ['get-tours'] })
            }
        }
    )
}

export default useCancelTourMutation