import { Controller, Get, Query } from '@nestjs/common'
import { GetUsersTotalScoreQuery, GetUsersScoreDiffQuery } from '@tennis-stats/dto'
import StatisticsService from './statistics.service'


@Controller('statistics')
class StatisticsController {
    
    constructor(
        private service: StatisticsService
    ) {}
    
    @Get('/total-score')
    getUsersTotalScore(@Query() dto: GetUsersTotalScoreQuery) {
        return this.service.getUsersTotalScore(dto)
    }
    
    @Get('/score-diff')
    getUsersScoreDiff(@Query() dto: GetUsersScoreDiffQuery) {
        return this.service.getUsersScoreDiff(dto)
    }
    
}

export default StatisticsController