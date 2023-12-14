import { IUser } from '@tennis-stats/types'
import { useMutation } from 'react-query'
import axiosFetcher from '../axios/fetcher'


type TArr = [[IUser, IUser]]

function useGenerateSequenceMutation() {
    
    // const queryClient = useQueryClient()
    
    return useMutation(
        ['generate-sequence'],
        (d) => axiosFetcher.post<TArr>('/sequence-generator/generate')
    )
}

export default useGenerateSequenceMutation