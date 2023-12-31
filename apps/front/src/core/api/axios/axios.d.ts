import 'axios'

declare module 'axios' {
    export interface AxiosRequestConfig {
        skipToastError?: boolean
        skipAuthRefresh?: boolean
    }
    export interface InternalAxiosRequestConfig {
        skipToastError?: boolean
        skipAuthRefresh?: boolean
    }
}