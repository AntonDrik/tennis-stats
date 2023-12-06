import { IPlayer } from './player'
import { ITour } from './tour'



interface IGameSet {
    id: number
    tour: ITour
    player1: IPlayer
    player2: IPlayer
    // Стоит отказаться от этой переменной. Можно её вычислять динамически на основе player1 - player2
    winner: IPlayer
    time: Date
}

export { IGameSet }