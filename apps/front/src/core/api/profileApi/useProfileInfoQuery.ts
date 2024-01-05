import { IProfile } from '@tennis-stats/types'
import { useQuery } from 'react-query'
import axiosFetcher from '../axios/fetcher'


function useProfileInfoQuery(userId: number | string) {
    return useQuery(
        [`profile-info-${userId}`],
        (d) => axiosFetcher.get<IProfile>(`/users/${userId}/profile/info`)
    )
}

export default useProfileInfoQuery