import { Body, Controller, Get, Post } from '@nestjs/common'
import { IdDto } from '@tennis-stats/dto'
import GameSetsRepository from './game-sets.repository'
import { GameSetsService } from './index'


@Controller('game-sets')
class GameSetsController {
    
    constructor(
        private repository: GameSetsRepository,
        private gameSetsService: GameSetsService
    ) {}
    
    @Get('/active')
    getActiveGameSet() {
        return this.repository.findActiveGameSet()
    }
    
    @Post('/start')
    startGameSet(@Body() dto: IdDto) {
        return this.gameSetsService.startGameSet(dto)
    }
    
    @Post('/finish')
    finishGameSet(@Body() dto: IdDto) {
        return this.gameSetsService.finishGameSet(dto)
    }
    
}

export default GameSetsController