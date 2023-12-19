import IconButton from '@mui/material/IconButton'
import React from 'react'
import { toast, ToastBar, Toaster as HotToaster } from 'react-hot-toast'
import CloseIcon from '@mui/icons-material/Close'
import Box from '@mui/material/Box'


function Toaster() {
    return (
        <HotToaster
            position={'bottom-center'}
            toastOptions={{
                duration: 5000,
                style: {
                    maxWidth: '600px'
                }
            }}
        >
            {(t) => (
                <ToastBar toast={t}>
                    {({ icon, message }) => (
                        <Box id={'toaster'} display={'flex'} alignItems={'center'}>
                            {icon}
                            {message}
                            {t.type !== 'loading' && (
                                <IconButton onClick={() => toast.dismiss(t.id)}>
                                    <CloseIcon/>
                                </IconButton>
                            )}
                        </Box>
                    )}
                </ToastBar>
            )}
        </HotToaster>
    )
    
}

export default Toaster