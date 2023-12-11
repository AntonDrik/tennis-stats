import { atom } from 'jotai'
import { EGameModalType } from './GameModalContainer.types'

const gameModalAtom = atom<EGameModalType>(EGameModalType.INITIAL)

export { gameModalAtom }