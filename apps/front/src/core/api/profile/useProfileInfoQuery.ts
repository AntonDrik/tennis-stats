import { IProfile } from '@tennis-stats/types'
import { useQuery } from 'react-query'
import { meAtom, meStore, updateMeStore } from '../../store'
import axiosFetcher from '../axios/fetcher'


function useProfileInfoQuery(userId: number | string) {
    return useQuery(
        [`profile-info-${userId}`],
        (d) => axiosFetcher.get<IProfile>(`/users/${userId}/profile/info`),
        {
            onSuccess: (data) => {
                const currMe = meStore.get(meAtom)
                if (data.user.id === currMe?.id) {
                    updateMeStore(data.user)
                }
            }
        }
    )
}

export default useProfileInfoQuery