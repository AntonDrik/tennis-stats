import { Body, Controller, Delete, Get, Patch, Post, Put } from '@nestjs/common';
import { GameSetScoreDto, SwapUserDto } from '@tennis-stats/dto';
import { GameSet, Match } from '@tennis-stats/entities';
import { EPermission } from '@tennis-stats/types';
import { Permissions } from '../../../auth/decorators';
import { GameSetById } from '../decorators/game-set.decorator';
import { MatchById } from '../decorators/match.decorator';
import GameSetService from '../services/game-set.service';
import MatchService from '../services/match.service';

@Controller('tournaments/:tournamentId/tours/:tourId/match')
class MatchController {
  constructor(
    private matchService: MatchService,
    private gameSetService: GameSetService
  ) {}

  @Get('/:matchId/rating-delta')
  getRatingDeltaOfMatch(@MatchById() match: Match) {
    return this.matchService.calculateRatingDelta(match);
  }

  @Get('/:matchId/game-set/:setId')
  getGameSet(@GameSetById() gameSet: GameSet): GameSet {
    return gameSet;
  }

  @Post('/:matchId/game-set/:setId/finish')
  @Permissions([EPermission.GAME_SET_CRUD])
  finishGameSet(
    @MatchById() match: Match,
    @GameSetById() gameSet: GameSet,
    @Body() dto: GameSetScoreDto
  ) {
    return this.gameSetService.finishGameSet(match, gameSet, dto);
  }

  @Put('/:matchId/game-set/:setId/edit')
  @Permissions([EPermission.GAME_SET_CRUD])
  editGameSet(
    @MatchById() match: Match,
    @GameSetById() gameSet: GameSet,
    @Body() dto: GameSetScoreDto
  ) {
    return this.gameSetService.editGameSet(match, gameSet, dto);
  }

  @Patch('/:matchId/swap-user')
  @Permissions([EPermission.TOURNAMENT_CRUD])
  swapUser(@MatchById() match: Match, @Body() dto: SwapUserDto) {
    return this.matchService.swapUser(match, dto);
  }

  @Delete('/:matchId')
  @Permissions([EPermission.TOURNAMENT_CRUD])
  deleteMatch(@MatchById() match: Match) {
    return this.matchService.deleteMatch(match);
  }
}

export default MatchController;
