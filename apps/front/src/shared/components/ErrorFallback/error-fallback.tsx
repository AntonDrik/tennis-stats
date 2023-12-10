import React from 'react'
import { Box } from '@mui/material'


function ErrorFallback({ error }: { error: Error }) {
    return (
        <Box p={2} role="alert">
            <p>Something went wrong</p>
            <pre>{error?.message}</pre>
        </Box>
    )
}

export default ErrorFallback