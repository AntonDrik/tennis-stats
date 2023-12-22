import { Body, Controller, Get, Post, Put } from '@nestjs/common'
import { FinishGameSetDto, GameSetScoreDto } from '@tennis-stats/dto'
import { GameSet } from '@tennis-stats/entities'
import { IdParam } from '../../common/decorators'
import { GameSetService } from './game-set'
import MatchService from './match.service'


@Controller('match')
class MatchController {
    
    constructor(
        private matchService: MatchService,
        private gameSetService: GameSetService
    ) {}
    
    @Get('/:matchId/game-set/:setId')
    getGameSet(@IdParam('setId') setId: number): Promise<GameSet> {
        return this.gameSetService.getGameSet(setId)
    }
    
    
    @Post('/:matchId/game-set/:setId/start')
    startGameSet(@IdParam('setId') setId: number) {
        return this.gameSetService.startGameSet(setId)
    }
    
    
    @Post('/:matchId/game-set/:setId/finish')
    async finishGameSet(
        @IdParam('matchId') matchId: number,
        @IdParam('setId') setId: number,
        @Body() dto: FinishGameSetDto
    ) {
        return this.matchService.finishGameSetOrMatch(matchId, setId, dto)
    }
    
    
    @Put('/:matchId/game-set/:setId/update-score')
    updateScore(
        @IdParam('setId') setId: number,
        @Body() dto: GameSetScoreDto
    ): Promise<GameSet> {
        return this.gameSetService.updateScore(setId, dto)
    }
}

export default MatchController