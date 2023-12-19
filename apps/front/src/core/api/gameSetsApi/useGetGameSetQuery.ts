import { IGameSet } from '@tennis-stats/types'
import { useQuery } from 'react-query'
import axiosFetcher from '../axios/fetcher'
import { TQueryOptions } from '../types'


function useGetGameSetQuery(id: string | number, options?: TQueryOptions<IGameSet>) {
    return useQuery(
        ['get-gameSet', `get-gameSet-${id}`],
        () => axiosFetcher.get<IGameSet>(`/game-sets/${id}`),
        options
    )
}

export default useGetGameSetQuery