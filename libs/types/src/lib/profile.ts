import { IUser } from './user'


export interface IProfile {
    user: IUser
    winPercent: {
        prev: number
        todayDiff: number
    }
    gamesCount: number
}
