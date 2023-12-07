import { CreateTourDto } from '@tennis-stats/dto'
import { useMutation } from 'react-query'
import axiosFetcher from '../client/axios-fetcher'


function useCreateTourMutation() {
    return useMutation(
        ['create-tour'],
        (dto: CreateTourDto) => axiosFetcher.post<CreateTourDto>('/tours', dto)
    )
}

export default useCreateTourMutation