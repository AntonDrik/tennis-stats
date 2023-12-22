import { FinishGameSetDto } from '@tennis-stats/dto'
import { IGameSet } from '@tennis-stats/types'
import { useMutation, useQueryClient } from 'react-query'
import axiosFetcher from '../axios/fetcher'


function useFinishGameSetMutation(matchId?: number, gameSetId?: number) {
    
    const queryClient = useQueryClient()
    
    return useMutation(
        ['finish-game-set'],
        (dto: FinishGameSetDto) => {
            return axiosFetcher.post<IGameSet, FinishGameSetDto>(
                `/match/${matchId}/game-set/${gameSetId}/finish`,
                dto
            )
        },
        {
            onSuccess: () => {
                void queryClient.invalidateQueries({ queryKey: 'get-tour' })
            }
        }
    )
}

export default useFinishGameSetMutation