import { IdDto } from '@tennis-stats/dto'
import { IGameSet } from '@tennis-stats/types'
import { useMutation, useQueryClient } from 'react-query'
import axiosFetcher from '../axios/fetcher'


function useStartGameSetMutation() {
    
    const queryClient = useQueryClient()
    
    return useMutation(
        ['start-game-tour'],
        (dto: IdDto) => axiosFetcher.post<IGameSet>('/game-sets/start', dto),
        {
            onSuccess: () => {
                void queryClient.invalidateQueries({queryKey: 'get-tours'})
            }
        }
    )
}

export default useStartGameSetMutation