import { IMatch } from './match'


interface ITour {
    id: number
    date: Date
    setsCount: number
    isActive: boolean
    matches: IMatch[]
}

export { ITour }