import { IGameSet } from './game-set';
import { IUser } from './user';


type TScore = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11

interface IPlayer {
    id: number
    gameSet: IGameSet
    user: IUser
    score: TScore
}

export { IPlayer, TScore }