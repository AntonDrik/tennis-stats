import { IGameSet } from './game-set'


enum ETourStatus {
    ACTIVE = 'ACTIVE',
    FINISHED = 'FINISHED',
    CANCELED = 'CANCELED'
}

interface ITour {
    id: number
    date: Date
    setsCount: number
    status: ETourStatus
    gameSets: IGameSet[]
}

export { ITour, ETourStatus }