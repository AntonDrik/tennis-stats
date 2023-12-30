import { Module } from '@nestjs/common'
import { TourModule } from '../tours'
import { MatchModule } from '../tours/modules/match'
import StatisticsController from './statistics.controller'
import StatisticsService from './statistics.service'


@Module({
    imports: [
        TourModule,
        MatchModule
    ],
    controllers: [StatisticsController],
    providers: [StatisticsService],
    exports: []
})
class StatisticsModule {}


export default StatisticsModule