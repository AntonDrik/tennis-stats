import { CreateTourDto } from '@tennis-stats/dto'
import { useMutation } from 'react-query'
import axiosFetcher from '../client/axios-fetcher'


function useCreateTourMutation() {
    return useMutation(
        ['create-tour'],
        () => axiosFetcher.post<CreateTourDto>('/tours')
    )
}

export default useCreateTourMutation