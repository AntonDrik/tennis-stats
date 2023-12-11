import { IdDto } from '@tennis-stats/dto'
import { useMutation, useQueryClient } from 'react-query'
import axiosFetcher from '../client/axios-fetcher'


function useFinishGameSetMutation() {
    
    const queryClient = useQueryClient()
    
    return useMutation(
        ['finish-game-tour'],
        (dto: IdDto) => axiosFetcher.post<IdDto>('/game-sets/finish', dto),
        {
            onSuccess: () => {
                void queryClient.invalidateQueries({queryKey: 'get-tours'})
            }
        }
    )
}

export default useFinishGameSetMutation