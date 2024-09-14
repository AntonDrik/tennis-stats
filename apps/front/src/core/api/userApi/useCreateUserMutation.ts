import { CreateUserDto } from '@tennis-stats/dto'
import { IUser } from '@tennis-stats/types'
import { useMutation, useQueryClient } from 'react-query'
import axiosFetcher from '../axios/fetcher'


function useCreateUserMutation() {
    
    const queryClient = useQueryClient()
    
    return useMutation(
        ['create-user'],
        (dto: CreateUserDto) => axiosFetcher.post<IUser, CreateUserDto>(`/users`, dto),
        {
            onSuccess: () => {
                void queryClient.invalidateQueries({ queryKey: 'get-users' })
            }
        }
    )
}

export default useCreateUserMutation