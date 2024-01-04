import { IUser } from '@tennis-stats/types'
import { AxiosError } from 'axios'
import { useQuery } from 'react-query'
import axiosFetcher from '../axios/fetcher'


function useUserQuery(id: number | string) {
    return useQuery<IUser, AxiosError>(
        [`get-user-${id}`],
        () => axiosFetcher.get<IUser>(`/users/${id}`)
    )
}

export default useUserQuery