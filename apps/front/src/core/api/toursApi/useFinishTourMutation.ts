import { IdDto } from '@tennis-stats/dto'
import { ITour } from '@tennis-stats/types'
import { useMutation, useQueryClient } from 'react-query'
import axiosFetcher from '../axios/fetcher'


function useFinishTourMutation() {
    
    const queryClient = useQueryClient()
    
    return useMutation(
        'finish-tour',
        (dto: IdDto) => axiosFetcher.post<ITour, IdDto>('/tours/finish', dto),
        {
            onSuccess: () => {
                void queryClient.invalidateQueries({ queryKey: ['get-tours'] })
            }
        }
    )
}

export default useFinishTourMutation