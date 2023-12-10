import { Injectable } from '@nestjs/common'
import { Player, User } from '@tennis-stats/entities'
import { DataSource, In, Repository } from 'typeorm'


@Injectable()
class UsersRepository extends Repository<User> {
    
    constructor(dataSource: DataSource) {
        super(User, dataSource.createEntityManager())
    }
    
    public getUsersByIds(ids: number[]) {
        return this.findBy({
            id: In(ids)
        })
    }
    
    public async getPlayerEntity(id: number): Promise<Player | null> {
        const user = await this.findOneBy({ id })
        
        if (!user) {
            return null
        }
        
        const player = new Player()
        player.user = user as User
        player.score = 0
        
        return player
    }
    
}

export default UsersRepository