import { DialogProps } from '@mui/material/Dialog'
import { ReactElement } from 'react'


interface IModalState {
    component: ReactElement | null
    props: Omit<DialogProps, 'open'> | null
}

interface IModal {
    open: (component: ReactElement, props?: IModalState['props']) => void;
    close: () => void;
}

export {
    IModalState,
    IModal
}