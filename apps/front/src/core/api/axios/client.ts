import axios, { AxiosError } from 'axios'
import { toast } from 'react-hot-toast'

interface ResponseError {
    statusCode: number,
    message: string
}

const axiosClient = axios.create({
    baseURL: '/api',
    withCredentials: true
})

axiosClient.interceptors.response.use(
    (response) => response,
    (error: AxiosError<ResponseError>) => {
        const config = error.config
        const message = error.response?.data.message ?? error.message ?? 'Unknown error'
        
        if (!config?.skipToastError) {
            toast.error(message)
        }
        
        return Promise.reject(message)
    }
)

export default axiosClient