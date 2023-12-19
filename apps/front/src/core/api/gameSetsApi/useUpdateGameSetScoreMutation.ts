import { GameSetScoreDto } from '@tennis-stats/dto'
import { IGameSet } from '@tennis-stats/types'
import { useMutation } from 'react-query'
import axiosFetcher from '../axios/fetcher'


function useUpdateGameSetScoreMutation() {
    return useMutation(
        ['update-gameSet-score'],
        (dto: GameSetScoreDto) => {
            return axiosFetcher.put<IGameSet, GameSetScoreDto>(`/game-sets/update-score`, dto)
        }
    )
}

export default useUpdateGameSetScoreMutation