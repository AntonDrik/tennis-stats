import { TScore } from '@tennis-stats/types'
import { atom } from 'jotai'


const scoreBlockAtom = atom<[TScore, TScore]>([0, 0])

export {
    scoreBlockAtom
}