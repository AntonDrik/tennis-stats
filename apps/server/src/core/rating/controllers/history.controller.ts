import { Controller, Get } from '@nestjs/common';
import { IdParam } from '../../../common/decorators';
import RatingHistoryService from '../services/history.service';

@Controller('/rating-history')
class RatingHistoryController {
  constructor(private service: RatingHistoryService) {}

  @Get()
  getRatingHistoryForAll() {
    return this.service.getHistoryForAll();
  }

  @Get('/user/:id')
  getRatingHistory(@IdParam() id: number) {
    return this.service.getHistoryForUser(id);
  }
}

export default RatingHistoryController;
