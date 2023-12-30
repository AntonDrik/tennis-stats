import { Injectable } from '@nestjs/common'
import { RatingHistory, User } from '@tennis-stats/entities'
import { IAvgRatingByDay } from '@tennis-stats/types'
import { EntityManager } from 'typeorm'
import { settle } from '../../common/utils'
import RatingHistoryRepository from './rating-history.repository'
import { getAvgRatingByDaysQuery } from './sql'


@Injectable()
class RatingHistoryService {
    
    constructor(
        private repository: RatingHistoryRepository
    ) {}
    
    public getHistory(): Promise<IAvgRatingByDay[]> {
        const query = getAvgRatingByDaysQuery()
        return this.repository.executeQuery<IAvgRatingByDay[]>(query)
    }
    
    public async makeSnapshot(users: User[], transactionManager?: EntityManager) {
        const currentTime = new Date()
        
        await this.repository.withTransaction(async (manager) => {
            
            const promises = users.map((user) => {
                return manager.insert(RatingHistory, {
                    date: currentTime,
                    user,
                    rating: user.rating
                })
            })
            await settle(promises)
            
        }, transactionManager)
    }
    
}

export default RatingHistoryService