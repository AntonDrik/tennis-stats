import { LoginDto } from '@tennis-stats/dto'
import { useMutation } from 'react-query'
import axiosFetcher from '../axios/fetcher'


function useLoginMutation() {
    
    return useMutation(
        ['login'],
        (dto: LoginDto) => {
            return axiosFetcher.post<boolean, LoginDto>('/auth/login', dto)
        },
    )
    
}

export default useLoginMutation