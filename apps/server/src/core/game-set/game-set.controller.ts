import { Body, Controller, Get, Post } from '@nestjs/common'
import { FinishGameSetDto, IdDto } from '@tennis-stats/dto'
import GameSetRepository from './game-set.repository'
import { GameSetService } from './index'


@Controller('game-sets')
class GameSetController {
    
    constructor(
        private repository: GameSetRepository,
        private service: GameSetService
    ) {}
    
    @Get('/active')
    getActiveGameSet() {
        return this.repository.findActiveGameSet()
    }
    
    @Post('/start')
    startGameSet(@Body() dto: IdDto) {
        return this.service.startGameSet(dto)
    }
    
    @Post('/finish')
    finishGameSet(@Body() dto: FinishGameSetDto) {
        return this.service.finishGameSet(dto)
    }
    
}

export default GameSetController