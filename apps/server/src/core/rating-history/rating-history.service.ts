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
    
    public getHistoryForAll(): Promise<IAvgRatingByDay[]> {
        const query = getAvgRatingByDaysQuery()
        
        return this.repository.executeQuery<IAvgRatingByDay[]>(query)
    }
    
    public getHistoryForUser(userId: number): Promise<IAvgRatingByDay[]> {
        const query = getAvgRatingByDaysQuery(userId)
    
        return this.repository.executeQuery<IAvgRatingByDay[]>(query)
    }
    
    public async makeSnapshot(users: User[], tourDate: Date, transactionManager?: EntityManager) {
        await this.repository.withTransaction(async (manager) => {
            
            const promises = users.map(async (user) => {
                const todayRating = await this.repository.findHistoryForDate(user.id, tourDate, manager)
                
                if (todayRating) {
                    todayRating.rating = user.rating
                    await todayRating.save()
                    
                    return
                }
                
                await manager.insert(RatingHistory, {
                    date: tourDate,
                    user,
                    rating: user.rating
                })
            })
            await settle(promises)
            
        }, transactionManager)
    }
    
}

export default RatingHistoryService