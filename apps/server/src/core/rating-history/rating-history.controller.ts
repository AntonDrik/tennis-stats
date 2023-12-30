import { Controller, Get } from '@nestjs/common'
import RatingHistoryService from './rating-history.service'


@Controller('/rating-history')
class RatingHistoryController {
    
    constructor(
        private service: RatingHistoryService
    ) {}
    
    @Get()
    getRatingHistory() {
        return this.service.getHistory()
    }
    
}

export default RatingHistoryController