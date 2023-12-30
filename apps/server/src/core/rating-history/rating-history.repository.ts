import { Injectable } from '@nestjs/common'
import { RatingHistory } from '@tennis-stats/entities'
import { DataSource } from 'typeorm'
import { BaseRepository } from '../../common/utils'


@Injectable()
class RatingHistoryRepository extends BaseRepository<RatingHistory> {
    
    constructor(dataSource: DataSource) {
        super(RatingHistory, dataSource)
    }
    
}

export default RatingHistoryRepository