import { IdDto } from '@tennis-stats/dto'
import { GameSet } from '@tennis-stats/entities'
import { useMutation, useQueryClient } from 'react-query'
import axiosFetcher from '../client/axios-fetcher'


function useStartGameSetMutation() {
    
    const queryClient = useQueryClient()
    
    return useMutation(
        ['start-game-tour'],
        (dto: IdDto) => axiosFetcher.post<GameSet>('/game-sets/start', dto),
        {
            onSuccess: () => {
                void queryClient.invalidateQueries({queryKey: 'get-active-game-set'})
            }
        }
    )
}

export default useStartGameSetMutation