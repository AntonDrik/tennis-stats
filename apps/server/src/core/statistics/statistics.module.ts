import { Module } from '@nestjs/common'
import { TourModule } from '../tours'
import StatisticsController from './statistics.controller'
import StatisticsService from './statistics.service'


@Module({
    imports: [
        TourModule
    ],
    controllers: [StatisticsController],
    providers: [StatisticsService],
    exports: []
})
class StatisticsModule {}


export default StatisticsModule