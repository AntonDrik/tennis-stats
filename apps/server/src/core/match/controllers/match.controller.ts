import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { GameSetScoreDto } from '@tennis-stats/dto';
import { GameSet, Match, User } from '@tennis-stats/entities';
import { EPermission } from '@tennis-stats/types';
import { CurrentUser, Permissions } from '../../../auth/decorators';
import {
  ForbiddenException,
  UnableDeleteFinishedException,
} from '../../../common/exceptions';
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

  @Get('/:matchId/game-set/:setId')
  getGameSet(@GameSetById() gameSet: GameSet): GameSet {
    return gameSet;
  }

  @Post('/:matchId/game-set/:setId/finish')
  finishGameSet(
    @CurrentUser() user: User,
    @MatchById() match: Match,
    @GameSetById() gameSet: GameSet,
    @Body() dto: GameSetScoreDto
  ) {
    if (!this.matchService.isUserCanCrudMatch(user, match)) {
      throw new ForbiddenException();
    }

    return this.matchService.finishGameSet(match, gameSet, dto);
  }

  @Put('/:matchId/game-set/:setId/edit')
  editGameSet(
    @CurrentUser() user: User,
    @MatchById() match: Match,
    @GameSetById() gameSet: GameSet,
    @Body() dto: GameSetScoreDto
  ) {
    if (!this.matchService.isUserCanCrudMatch(user, match)) {
      throw new ForbiddenException();
    }

    return this.gameSetService.editGameSet(match, gameSet, dto);
  }

  @Delete('/:matchId')
  @Permissions([EPermission.TOURNAMENT_CRUD])
  async deleteMatch(@MatchById() match: Match) {
    if (match.isFinished) {
      throw new UnableDeleteFinishedException();
    }

    await match.remove();
  }
}

export default MatchController;
