import { IGameSet } from '@tennis-stats/types'
import { useMutation, useQueryClient } from 'react-query'
import axiosFetcher from '../axios/fetcher'


function useStartGameSetMutation(matchId?: number, setId?: number) {
    
    const queryClient = useQueryClient()
    
    return useMutation(
        ['start-game-tour'],
        () => axiosFetcher.post<IGameSet>(`/match/${matchId}/game-set/${setId}/start`),
        {
            onSuccess: () => {
                void queryClient.invalidateQueries({queryKey: 'get-tours'})
            }
        }
    )
}

export default useStartGameSetMutation