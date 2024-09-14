import { atom } from 'jotai'
import { IModalState } from './Modal.types'


const modalAtom = atom<IModalState>({
    component: null,
    props: null
})

export {
    modalAtom
}