import { Module } from '@nestjs/common';
import { TourModule } from '../tours';
import { MatchModule } from '../match';
import StatisticController from './statistic.controller';
import StatisticService from './statistic.service';

@Module({
  imports: [TourModule, MatchModule],
  controllers: [StatisticController],
  providers: [StatisticService],
  exports: [],
})
class StatisticModule {}

export default StatisticModule;
