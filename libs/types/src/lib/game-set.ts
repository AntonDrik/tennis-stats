import { IMatch } from './match'
import { IPlayer } from './player'


enum EGameSetStatus {
    PENDING = 'PENDING',
    READY_TO_START = 'READY_TO_START',
    IN_PROCESS = 'IN_PROCESS',
    FINISHED = 'FINISHED',
    CANCELED = 'CANCELED'
}

interface IGameSet {
    id: number
    match: IMatch
    // Номер сета
    number: number
    player1: IPlayer
    player2: IPlayer
    startDate: Date | null
    endDate: Date
    status: EGameSetStatus
    isLastInMatch: boolean
    
    duration: string
    isFinished: boolean
}

export { IGameSet, EGameSetStatus }