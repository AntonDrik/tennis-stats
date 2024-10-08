import { IUserWithRatingDiff } from '@tennis-stats/types';
import { AxiosError } from 'axios'
import { useQuery } from 'react-query'
import axiosFetcher from '../axios/fetcher'


function useUsersQuery() {
    return useQuery<IUserWithRatingDiff[], AxiosError>(
        ['get-users'],
        () => axiosFetcher.get<IUserWithRatingDiff[]>('/users')
    )
}

export default useUsersQuery
