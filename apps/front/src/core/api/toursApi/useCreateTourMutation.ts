import { CreateTourDto } from '@tennis-stats/dto'
import { useMutation, useQueryClient } from 'react-query'
import axiosFetcher from '../axios/fetcher'


function useCreateTourMutation() {
    
    const queryClient = useQueryClient()
    
    return useMutation(
        ['create-tour'],
        (dto: CreateTourDto) => axiosFetcher.post<CreateTourDto>('/tours', dto),
        {
            onSuccess: () => {
                void queryClient.invalidateQueries({queryKey: 'get-tours'})
            }
        }
    )
}

export default useCreateTourMutation