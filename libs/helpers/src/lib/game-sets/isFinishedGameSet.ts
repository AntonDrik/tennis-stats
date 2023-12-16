import { EGameSetStatus, IGameSet } from '@tennis-stats/types'


function isFinishedGameSet(gameSet: IGameSet): boolean {
    const finishedStatuses = [EGameSetStatus.CANCELED, EGameSetStatus.FINISHED]
    
    return finishedStatuses.includes(gameSet.status)
}

export default isFinishedGameSet