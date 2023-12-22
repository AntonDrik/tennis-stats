import { IGameSet } from '@tennis-stats/types'
import { useQuery } from 'react-query'
import axiosFetcher from '../axios/fetcher'
import { TQueryOptions } from '../types'


function useGetGameSetQuery(matchId?: number, setId?: number, options?: TQueryOptions<IGameSet>) {
    return useQuery(
        ['get-gameSet', `get-gameSet-${matchId}-${setId}`],
        () => axiosFetcher.get<IGameSet>(`/match/${matchId}/game-set/${setId}`),
        options
    )
}

export default useGetGameSetQuery