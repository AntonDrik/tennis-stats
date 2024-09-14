import { useSetAtom } from 'jotai'
import { ReactElement } from 'react'
import { IModal, IModalState } from '../Modal.types'
import { modalAtom } from '../Modal.state'


function useModal(): IModal {
    
    const setModal = useSetAtom(modalAtom)
    
    const open = (component: ReactElement, props?: IModalState['props']) => {
        setModal({ component, props: props ?? null })
    }
    
    const close = () => setModal({
        component: null,
        props: null
    })
    
    return { open, close }
    
}


export default useModal