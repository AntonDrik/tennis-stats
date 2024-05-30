import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { FinishGameSetDto, GameSetScoreDto } from '@tennis-stats/dto';
import { GameSet } from '@tennis-stats/entities';
import { EPermission } from '@tennis-stats/types';
import { Permissions } from '../../../../auth/decorators';
import { IdParam } from '../../../../common/decorators';
import MatchService from './match.service';
import { GameSetRepository, GameSetService } from './modules/game-set';


@Controller('match')
class MatchController {

  constructor(
    private matchService: MatchService,
    private gameSetService: GameSetService,
    private gameSetRepository: GameSetRepository
  ) {
  }

  @Get('/:matchId/rating-delta')
  getRatingDeltaOfMatch(@IdParam('matchId') matchId: number) {
    return this.matchService.calculateRatingDelta(matchId);
  }

  @Get('/:matchId/game-set/:setId')
  getGameSet(@IdParam('setId') setId: number): Promise<GameSet> {
    return this.gameSetRepository.findById(setId);
  }


  @Post('/:matchId/game-set/:setId/start')
  @Permissions([EPermission.GAME_SET_CRUD])
  startGameSet(@IdParam('setId') setId: number) {
    return this.gameSetService.startGameSet(setId);
  }


  @Post('/:matchId/game-set/:setId/finish')
  @Permissions([EPermission.GAME_SET_CRUD])
  async finishGameSet(
    @IdParam('matchId') matchId: number,
    @IdParam('setId') setId: number,
    @Body() dto: FinishGameSetDto
  ) {
    return this.matchService.finishGameSet(matchId, setId, dto);
  }


  @Put('/:matchId/game-set/:setId/update-score')
  @Permissions([EPermission.GAME_SET_CRUD])
  updateScore(
    @IdParam('setId') setId: number,
    @Body() dto: GameSetScoreDto
  ): Promise<GameSet> {
    return this.gameSetService.updateScore(setId, dto);
  }

  @Put('/:matchId/game-set/:setId/edit-score')
  @Permissions([EPermission.GAME_SET_CRUD])
  editScore(
    @IdParam('setId') setId: number,
    @Body() dto: GameSetScoreDto
  ) {
    return this.gameSetService.editScore(setId, dto);
  }
}

export default MatchController;
