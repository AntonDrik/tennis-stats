import { Injectable } from '@nestjs/common'
import { GameSet, Tour } from '@tennis-stats/entities'
import { EGameSetStatus } from '@tennis-stats/types'
import { DataSource, EntityManager, Repository } from 'typeorm'
import settle from '../../common/utils/settle'


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
    
    public findAllByTour(tour: Tour): Promise<GameSet[]> {
        return this.findBy({
            match: {
                tour: { id: tour.id }
            }
        })
    }
    
    public async cancelAllByTour(tour: Tour, transactionManager: EntityManager) {
        const gameSetsList = await this.findAllByTour(tour)
    
        const promise = gameSetsList.map(async (gameSet) => {
            await transactionManager.update(
                GameSet,
                { id: gameSet.id },
                { status: EGameSetStatus.CANCELED }
            )
        })
        
        return settle(promise)
    }
    
}

export default GameSetsRepository