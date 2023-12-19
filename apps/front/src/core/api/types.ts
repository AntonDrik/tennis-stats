import { UseQueryOptions } from 'react-query'


export interface IRequestOptions {
    toastError?: boolean
}

export type TQueryOptions<T> = Omit<UseQueryOptions<T, unknown, T, string[]>, 'queryKey' | 'queryFn'>