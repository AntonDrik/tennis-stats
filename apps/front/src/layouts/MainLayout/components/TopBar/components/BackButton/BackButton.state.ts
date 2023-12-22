import { atom } from 'jotai'


interface IBackButton {
    title: string
    link: string
}

const backButtonAtom = atom<IBackButton | null>(null)

export {
    IBackButton,
    backButtonAtom
}