import { Injectable } from '@nestjs/common'
import { GameSet } from '@tennis-stats/entities'
import { EGameSetStatus } from '@tennis-stats/types'
import { DataSource, Repository } from 'typeorm'


@Injectable()
class GameSetsRepository extends Repository<GameSet> {
    
    constructor(dataSource: DataSource) {
        super(GameSet, dataSource.createEntityManager())
    }
    
    public findActiveGameSet(): Promise<GameSet | null> {
        return this.findOneBy({
            status: EGameSetStatus.IN_PROCESS
        })
    }
    
}

export default GameSetsRepository