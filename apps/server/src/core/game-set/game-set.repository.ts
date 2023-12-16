import { Injectable } from '@nestjs/common'
import { GameSet, Player, Tour } from '@tennis-stats/entities'
import { EGameSetStatus } from '@tennis-stats/types'
import { DataSource, EntityManager, In, Not, Repository } from 'typeorm'
import settle from '../../common/utils/settle'


@Injectable()
class GameSetRepository extends Repository<GameSet> {
    
    constructor(dataSource: DataSource) {
        super(GameSet, dataSource.createEntityManager())
    }
    
    public findActiveGameSet(): Promise<GameSet | null> {
        return this.findOneBy({
            status: EGameSetStatus.IN_PROCESS
        })
    }
    
    public createEntity(number: number, player1: Player, player2: Player): GameSet {
        const gameSet = new GameSet()
        
        gameSet.number = number
        gameSet.player1 = player1
        gameSet.player2 = player2
        
        return gameSet
    }
    
    public async cancelAllUnfinished(tour: Tour, transactionManager: EntityManager) {
        const unfinishedGameSetsList = await this.findBy({
            status: Not(In([EGameSetStatus.CANCELED, EGameSetStatus.FINISHED])),
            match: {
                tour: { id: tour.id }
            }
        })
        
        const promise = unfinishedGameSetsList.map(async (gameSet) => {
            await transactionManager.update(
                GameSet,
                { id: gameSet.id },
                { status: EGameSetStatus.CANCELED }
            )
        })
        
        return settle(promise)
    }
    
}

export default GameSetRepository