import { Injectable } from '@nestjs/common'
import { Match } from '@tennis-stats/entities'
import { DataSource, Repository } from 'typeorm'


@Injectable()
class MatchRepository extends Repository<Match> {
    
    constructor(dataSource: DataSource) {
        super(Match, dataSource.createEntityManager())
    }
    
}

export default MatchRepository