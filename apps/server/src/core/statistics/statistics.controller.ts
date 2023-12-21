import { Controller, Get, Query } from '@nestjs/common'
import { GetUsersTotalScoreDto } from '@tennis-stats/dto'
import StatisticsService from './statistics.service'


@Controller('statistics')
class StatisticsController {
    
    constructor(
        private service: StatisticsService
    ) {}
    
    @Get('/total-score')
    getStatistics(@Query() dto: GetUsersTotalScoreDto) {
        return this.service.getStatistics(dto)
    }
    
    
}

export default StatisticsController