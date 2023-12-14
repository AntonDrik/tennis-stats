import { ButtonProps } from '@mui/material'


export interface IConfirmProps {
    title: string
    confirmButton: {
        caption: string
        onClick?: () => void
        props?: ButtonProps
    },
    denyButton: {
        caption: string
        onClick?: () => void
        props?: ButtonProps
    }
}