import { Controller } from '@nestjs/common';
import RatingHistoryService from '../services/rating-history.service';

@Controller('/rating-history')
class RatingHistoryController {
  constructor(private service: RatingHistoryService) {}

  // @Get()
  // getRatingHistoryForAll() {
  //   return this.service.getHistoryForAll();
  // }
  //
  // @Get('/user/:id')
  // getRatingHistory(@IdParam() id: number) {
  //   return this.service.getHistoryForUser(id);
  // }
}

export default RatingHistoryController;
