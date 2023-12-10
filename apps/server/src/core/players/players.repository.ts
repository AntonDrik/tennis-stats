import { Injectable } from '@nestjs/common'
import { Player, User } from '@tennis-stats/entities'
import { DataSource, In, Repository } from 'typeorm'


@Injectable()
class PlayersRepository extends Repository<Player> {
    
    constructor(dataSource: DataSource) {
        super(Player, dataSource.createEntityManager())
    }
    
    public getPlayersByIds(ids: number[]): Promise<Player[]> {
        return this.findBy({
            id: In(ids)
        })
    }
}

export default PlayersRepository