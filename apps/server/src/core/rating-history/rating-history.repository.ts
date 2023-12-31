import { Injectable } from '@nestjs/common'
import { RatingHistory } from '@tennis-stats/entities'
import { endOfDay, startOfDay } from 'date-fns'
import { Between, DataSource, EntityManager } from 'typeorm'
import { BaseRepository } from '../../common/utils'


@Injectable()
class RatingHistoryRepository extends BaseRepository<RatingHistory> {
    
    constructor(dataSource: DataSource) {
        super(RatingHistory, dataSource)
    }
    
    public findHistoryForDate(userId: number, date: Date, manager: EntityManager) {
        return manager.findOne(RatingHistory, {
            relations: ['user'],
            where: {
                user: { id: userId },
                date: Between(startOfDay(date), endOfDay(date))
            }
        })
    }
    
}

export default RatingHistoryRepository