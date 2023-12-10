import { IPlayer } from './player'
import { ITour } from './tour'


enum EGameSetStatus {
    PENDING = 'PENDING',
    IN_PROCESS = 'IN_PROCESS',
    FINISHED = 'FINISHED'
}

interface IGameSet {
    id: number
    tour: ITour
    player1: IPlayer
    player2: IPlayer
    time: Date
    status: EGameSetStatus
}

export { IGameSet, EGameSetStatus }