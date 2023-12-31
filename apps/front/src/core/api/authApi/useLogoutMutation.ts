import { useMutation } from 'react-query'
import axiosFetcher from '../axios/fetcher'


function useLogoutMutation() {
    
    return useMutation(
        ['logout'],
        () => {
            return axiosFetcher.post<boolean>('/auth/logout')
        },
    )
    
}

export default useLogoutMutation