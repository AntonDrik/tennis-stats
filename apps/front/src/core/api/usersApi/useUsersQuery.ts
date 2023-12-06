import { IUser } from '@tennis-stats/types'
import { AxiosError } from 'axios'
import { useQuery } from 'react-query'
import axiosFetcher from '../client/axios-fetcher'


function useUsersQuery() {
    return useQuery<IUser[], AxiosError>(
        ['get-users'],
        () => axiosFetcher.get<IUser[]>('/users')
    )
}

export default useUsersQuery