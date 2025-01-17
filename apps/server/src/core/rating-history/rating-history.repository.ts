import { Injectable } from '@nestjs/common'
import { RatingHistory } from '@tennis-stats/entities'
import { endOfDay, startOfDay } from 'date-fns'
import { Between, DataSource, EntityManager, LessThan } from 'typeorm';
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

    public findPrevDayRating(userId: number) {
      return this.find({
        relations: ['user'],
        order: { date: 'DESC' },
        where: {
          user: { id: userId },
          date: LessThan(startOfDay(new Date()))
        },
        take: 1
      });
    }

}

export default RatingHistoryRepository
