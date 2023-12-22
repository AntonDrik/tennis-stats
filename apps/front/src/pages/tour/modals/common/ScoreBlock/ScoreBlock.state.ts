import { TScore } from '@tennis-stats/types'
import { atom } from 'jotai'


const scoreBlockAtom = atom<[TScore, TScore]>([0, 0])

const isValidScoreAtom = atom(
    (get) => {
        const score = get(scoreBlockAtom)
    
        if (score[0] < 11 && score[1] < 11) {
            return false
        }
    
        return score[0] !== score[1]
    }
)

export {
    scoreBlockAtom,
    isValidScoreAtom
}