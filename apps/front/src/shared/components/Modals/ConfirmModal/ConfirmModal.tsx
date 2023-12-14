import {
    Button,
    DialogActions,
    DialogContent,
    DialogTitle,
} from '@mui/material'
import * as React from 'react'
import { IConfirmProps } from './ConfirmModal.tyles'


function ConfirmModal({ title, confirmButton, denyButton }: IConfirmProps) {
    
    return (
        <>
            <DialogTitle
                align={'center'}
                variant={'h5'}
                textTransform={'uppercase'}
            >{title}</DialogTitle>
            
            <DialogContent>
                <DialogActions sx={{
                    justifyContent: 'space-between'
                }}>
                    <Button
                        onClick={denyButton.onClick}
                        {...denyButton?.props}
                    >
                        {denyButton.caption}
                    </Button>
                    
                    <Button
                        onClick={confirmButton.onClick}
                        {...confirmButton?.props}
                    >
                        {confirmButton.caption}
                    </Button>
                </DialogActions>
            </DialogContent>
        </>
    )
    
}

export default ConfirmModal