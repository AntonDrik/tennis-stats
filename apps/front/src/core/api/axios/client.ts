import axios, { AxiosError } from 'axios'
import { toast } from 'react-hot-toast'
import setRefreshInterceptor from 'axios-auth-refresh'
import { routes } from '../../../routes/routes'
import { appRoutes } from '../../../routes/routes.constant'


interface ResponseError {
    statusCode: number,
    message: string
}

const refreshAuthInterceptor = () => {
    return axios.post('/api/auth/refresh', null, { skipAuthRefresh: true })
        .catch(() => {
            void routes.navigate(appRoutes.LOGIN)
        })
}

const axiosClient = axios.create({
    baseURL: '/api',
    withCredentials: true
})

setRefreshInterceptor(axiosClient, refreshAuthInterceptor, {
    shouldRefresh: (error) => {
        const isUnauthorizedCode = error.response?.status === 401
        const isNotAuthEndpoint = !error.request.responseURL.includes('/api/login')
        
        return isUnauthorizedCode && isNotAuthEndpoint
    }
})

axiosClient.interceptors.response.use(
    (response) => response,
    (error: AxiosError<ResponseError>) => {
        const config = error.config
        const message = (error.response?.data.message ?? error.message) as string | object
        
        if (
            typeof message === 'string' &&
            message !== 'Unauthorized' &&
            !config?.skipToastError
        ) {
            toast.error(message)
        }
        
        return Promise.reject(message)
    }
)

export default axiosClient