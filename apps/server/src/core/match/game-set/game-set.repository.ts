import { Injectable } from '@nestjs/common'
import { GameSet, Player } from '@tennis-stats/entities'
import { EGameSetStatus } from '@tennis-stats/types'
import { DataSource, Repository } from 'typeorm'


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
    
    public createEntity(player1: Player, player2: Player, number: number, isLast: boolean): GameSet {
        const gameSet = new GameSet()
        
        gameSet.player1 = player1
        gameSet.player2 = player2
        gameSet.number = number
        gameSet.isLastInMatch = isLast
        
        return gameSet
    }
    
}

export default GameSetRepository