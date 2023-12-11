import { IMatch } from './match'


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
    matches: IMatch[]
}

export { ITour, ETourStatus }