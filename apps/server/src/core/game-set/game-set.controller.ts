import { Body, Controller, Get, Post, Put } from '@nestjs/common'
import { FinishGameSetDto, GameSetScoreDto, IdDto } from '@tennis-stats/dto'
import { GameSet } from '@tennis-stats/entities'
import { IdParam } from '../../common/decorators'
import GameSetRepository from './game-set.repository'
import { GameSetService } from './index'


@Controller('game-sets')
class GameSetController {
    
    constructor(
        private repository: GameSetRepository,
        private service: GameSetService
    ) {}
    
    @Get('/:id')
    getGameSet(@IdParam() id: number): Promise<GameSet> {
        return this.service.getGameSet(id)
    }
    
    @Get('/active')
    getActiveGameSet(): Promise<GameSet | null> {
        return this.repository.findActiveGameSet()
    }
    
    @Post('/start')
    startGameSet(@Body() dto: IdDto): Promise<GameSet> {
        return this.service.startGameSet(dto)
    }
    
    @Post('/finish')
    finishGameSet(@Body() dto: FinishGameSetDto): Promise<void> {
        return this.service.finishGameSet(dto)
    }
    
    @Put('/update-score')
    updateScore(@Body() dto: GameSetScoreDto): Promise<GameSet> {
        return this.service.updateScore(dto)
    }
    
}

export default GameSetController