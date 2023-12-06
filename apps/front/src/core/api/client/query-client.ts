import { QueryClient } from 'react-query'
import ms from 'ms'


const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            refetchOnMount: true,
            refetchOnReconnect: true,
            retry: false,
            staleTime: ms('5s'),
        },
        mutations: {
            retry: false,
        },
    },
})

export default queryClient