import { Controller, Get } from '@nestjs/common';
import { IdParam } from '../../../common/decorators';
import RatingHistoryService from '../services/history.service';

@Controller('/rating')
class RatingController {
  constructor(private ratingHistoryService: RatingHistoryService) {}

  @Get('/history')
  getRatingHistoryForAll() {
    return this.ratingHistoryService.getHistoryForAll();
  }

  @Get('/history/user/:id')
  getRatingHistory(@IdParam() id: number) {
    return this.ratingHistoryService.getHistoryForUser(id);
  }
}

export default RatingController;
