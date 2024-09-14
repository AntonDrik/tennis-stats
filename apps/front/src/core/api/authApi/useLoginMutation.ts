import { LoginDto } from '@tennis-stats/dto'
import { IAuthResponse } from '@tennis-stats/types'
import { useMutation } from 'react-query'
import axiosFetcher from '../axios/fetcher'


function useLoginMutation() {
    
    return useMutation(
        ['login'],
        (dto: LoginDto) => {
            return axiosFetcher.post<IAuthResponse, LoginDto>('/auth/login', dto)
        },
    )
    
}

export default useLoginMutation