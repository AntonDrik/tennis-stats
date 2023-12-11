import { IGameSet } from '@tennis-stats/types'
import { useQuery } from 'react-query'

import axiosFetcher from '../client/axios-fetcher'


function useGetActiveGameSetQuery() {
    return useQuery(
        ['get-active-game-set'],
        () => axiosFetcher.get<IGameSet | null>(`/game-sets/active`)
    )
}

export default useGetActiveGameSetQuery