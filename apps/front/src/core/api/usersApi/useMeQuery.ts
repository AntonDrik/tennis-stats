import { IUser } from '@tennis-stats/types'
import { useQuery } from 'react-query'
import axiosFetcher from '../axios/fetcher'


function useMeQuery() {
    return useQuery<IUser>(
        ['get-me'],
        () => axiosFetcher.get<IUser>('/users/me')
    )
}

export default useMeQuery