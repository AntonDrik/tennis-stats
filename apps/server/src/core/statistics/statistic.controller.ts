import { Controller, Get, Query } from '@nestjs/common';
import { GetPairStatisticQuery } from '@tennis-stats/dto';
import StatisticService from './statistic.service';


@Controller('statistic')
class StatisticController {

  constructor(
    private service: StatisticService
  ) {}

  @Get('/pair')
  getPairStatistic(@Query() dto: GetPairStatisticQuery) {
    return this.service.getPairStatistic(dto);
  }

  @Get('/common')
  getCommonStatistic() {
    return this.service.getCommonStatistic();
  }

  @Get('/available-dates')
  getAvailableDates() {
    return this.service.getAvailableDates();
  }

}

export default StatisticController;
