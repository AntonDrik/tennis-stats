import { Body, Controller, Get, Post } from '@nestjs/common'
import { IdListDto } from '@tennis-stats/dto'
import MatchOrderService from './match-order.service'


@Controller('matches-order')
class MatchOrderController {
    
    constructor(private service: MatchOrderService) {}
    
    @Get()
    getCurrentOrder() {
        return this.service.getCurrentOrder()
    }
    
    @Post('/create')
    createNewOrder() {
        return this.service.createOrderForAllUsers()
    }
    
    @Post('/generate')
    generate(@Body() dto: IdListDto) {
        return this.service.generateOrderForUsers(dto.id)
    }
    
}

export default MatchOrderController