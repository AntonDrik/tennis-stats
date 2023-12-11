import { IGameSet } from './game-set'
import { IPlayer, TScoreCaption } from './player'
import { ITour } from './tour'


interface IMatch {
    id: number
    tour: ITour
    player1: IPlayer
    player2: IPlayer
    gameSets: IGameSet[]
    matchScore: TScoreCaption
}

export { IMatch }