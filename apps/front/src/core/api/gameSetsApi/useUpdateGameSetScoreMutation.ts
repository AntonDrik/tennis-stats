import { GameSetScoreDto } from '@tennis-stats/dto'
import { IGameSet } from '@tennis-stats/types'
import { useMutation } from 'react-query'
import axiosFetcher from '../axios/fetcher'


function useUpdateGameSetScoreMutation(matchId?: number, setId?: number) {
    return useMutation(
        ['update-game-set-score'],
        (dto: GameSetScoreDto) => {
            return axiosFetcher.put<IGameSet, GameSetScoreDto>(
                `/match/${matchId}/game-set/${setId}/update-score`,
                dto
            )
        }
    )
}

export default useUpdateGameSetScoreMutation