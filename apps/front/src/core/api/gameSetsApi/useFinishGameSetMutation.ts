import { FinishGameSetDto } from '@tennis-stats/dto'
import { IGameSet } from '@tennis-stats/types'
import { useMutation, useQueryClient } from 'react-query'
import axiosFetcher from '../axios/fetcher'


function useFinishGameSetMutation() {
    
    const queryClient = useQueryClient()
    
    return useMutation(
        ['finish-game-set'],
        (dto: FinishGameSetDto) => {
            return axiosFetcher.post<IGameSet, FinishGameSetDto>('/game-sets/finish', dto)
        },
        {
            onSuccess: () => {
                void queryClient.invalidateQueries({ queryKey: 'get-tours' })
            }
        }
    )
}

export default useFinishGameSetMutation