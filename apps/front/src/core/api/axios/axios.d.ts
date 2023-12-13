import 'axios'

declare module 'axios' {
    export interface AxiosRequestConfig {
        skipToastError?: boolean
    }
    export interface InternalAxiosRequestConfig {
        skipToastError?: boolean
    }
}