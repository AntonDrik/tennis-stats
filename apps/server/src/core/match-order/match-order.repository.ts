import { Injectable } from '@nestjs/common'
import { MatchOrder, User } from '@tennis-stats/entities'
import { DataSource, Repository } from 'typeorm'


@Injectable()
class MatchOrderRepository extends Repository<MatchOrder> {
    
    constructor(dataSource: DataSource) {
        super(MatchOrder, dataSource.createEntityManager())
    }
    
    public getEntity(users: User[], order: number): MatchOrder {
        const entity = new MatchOrder()
        
        entity.order = order
        entity.user1 = users[0]
        entity.user2 = users[1]
        
        return entity
    }
    
}

export default MatchOrderRepository