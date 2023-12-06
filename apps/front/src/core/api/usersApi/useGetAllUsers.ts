import { IUser } from '@tennis-stats/types'
import { AxiosError } from 'axios'
import { useQuery } from 'react-query'
import axiosFetcher from '../client/axios-fetcher'


function useGetAllUsers() {
    return useQuery<IUser[], AxiosError>(
        ['get-all-users'],
        () => axiosFetcher.get<IUser[]>('/users')
    )
}

export default useGetAllUsers