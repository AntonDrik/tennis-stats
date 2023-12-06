import { AxiosRequestConfig } from 'axios'
import axiosClient from './axios-client'


interface IFetcher {
    get<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T>
    
    post<T = unknown, T1 = unknown>(url: string, data?: T1, config?: AxiosRequestConfig): Promise<T>
    
    put<T = unknown, T1 = unknown>(url: string, data?: T1, config?: AxiosRequestConfig): Promise<T>
    
    delete<T>(url: string, config?: AxiosRequestConfig): Promise<T>
}

const axiosFetcher: IFetcher = {
    get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        return axiosClient.get<T>(url, config).then((response) => response.data)
    },
    
    post<T, T1>(url: string, data?: T1, config?: AxiosRequestConfig): Promise<T> {
        return axiosClient.post<T>(url, data, config).then((response) => response.data)
    },
    
    put<T, T1>(url: string, data?: T1, config?: AxiosRequestConfig): Promise<T> {
        return axiosClient.put<T>(url, data, config).then((response) => response.data)
    },
    
    delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        return axiosClient.delete<T>(url, config).then((response) => response.data)
    }
}

export default axiosFetcher