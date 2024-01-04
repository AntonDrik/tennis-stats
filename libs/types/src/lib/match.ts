import { IGameSet } from './game-set'
import { ITour } from './tour'
import { IUser } from './user'

interface IMatchScore {
    user1: number
    user2: number
}

interface IMatch {
    id: number
    tour: ITour
    user1: IUser
    user2: IUser
    gameSets: IGameSet[]
    totalScore: IMatchScore
}

interface IMatchRatingDelta {
    score: string
    delta: number
}

export { IMatch, IMatchScore, IMatchRatingDelta }