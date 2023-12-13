import { IMatch } from './match'
import { IPlayer, TScoreCaption } from './player'


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
    player1: IPlayer
    player2: IPlayer
    startDate: Date | null
    endDate: Date
    status: EGameSetStatus
    setScore: TScoreCaption
    duration: string
}

export { IGameSet, EGameSetStatus }