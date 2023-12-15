import { Body, Controller, Get, Post } from '@nestjs/common'
import { IdListDto } from '@tennis-stats/dto'
import MatchOrderService from './match-order.service'


@Controller('matches-order')
class MatchOrderController {
    
    constructor(private service: MatchOrderService) {}
    
    @Get()
    getCurrentOrder() {
        return this.service.getCurrent()
    }
    
    @Post('/create')
    createNewOrder() {
        return this.service.createForAllUsers()
    }
    
    @Post('/generate')
    generate(@Body() dto: IdListDto) {
        return this.service.generateForUsers(dto.id)
    }
    
}

export default MatchOrderController