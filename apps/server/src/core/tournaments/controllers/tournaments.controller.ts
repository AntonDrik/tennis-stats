import { Body, Controller, Delete, Get, Post, Put, Query } from '@nestjs/common';
import {
  UpsertTournamentDto,
  StartTournamentDto,
  CreatePlayoffDto,
  TournamentRegistrationDto,
  IdDto,
  GetTournamentsQuery,
} from '@tennis-stats/dto';
import { Tournament, User } from '@tennis-stats/entities';
import { EPermission } from '@tennis-stats/types';
import { CurrentUser, Permissions } from '../../../auth/decorators';
import { ForbiddenException } from '../../../common/exceptions';
import { matchPermissions } from '../../../common/utils';
import { LeaderboardService } from '../../leaderboard';
import { TournamentById } from '../decorators/tournament.decorator';
import TournamentsService from '../services/tournaments.service';
import PlayoffService from '../services/playoff.service';

@Controller('tournaments')
class TournamentsController {
  constructor(
    private tournamentsService: TournamentsService,
    private leaderboardService: LeaderboardService,
    private playoffService: PlayoffService
  ) {}

  @Get()
  getTournamentsList(@Query() query: GetTournamentsQuery) {
    return this.tournamentsService.getTournamentsList(query);
  }

  @Post('/create')
  @Permissions([EPermission.TOURNAMENT_CRUD])
  createTournament(@Body() dto: UpsertTournamentDto) {
    return this.tournamentsService.createTournament(dto);
  }

  @Post('/:id/start')
  @Permissions([EPermission.TOURNAMENT_CRUD])
  startTournament(
    @TournamentById() tournament: Tournament,
    @Body() dto: StartTournamentDto
  ) {
    return this.tournamentsService.startTournament(tournament, dto);
  }

  @Post('/:id/finish')
  @Permissions([EPermission.TOURNAMENT_CRUD])
  finishTournament(@TournamentById() tournament: Tournament) {
    return this.tournamentsService.finishTournament(tournament);
  }

  @Put('/:id/edit')
  @Permissions([EPermission.TOURNAMENT_CRUD])
  editOpenedTournament(
    @TournamentById() tournament: Tournament,
    @Body() dto: UpsertTournamentDto
  ) {
    return this.tournamentsService.editTournament(tournament, dto);
  }

  @Delete('/:id/delete')
  @Permissions([EPermission.TOURNAMENT_CRUD])
  deleteTournament(@TournamentById() tournament: Tournament) {
    return this.tournamentsService.deleteTournament(tournament);
  }

  @Post('/:id/create-playoff')
  @Permissions([EPermission.TOURNAMENT_CRUD])
  createPlayoff(@TournamentById() tournament: Tournament, @Body() dto: CreatePlayoffDto) {
    return this.playoffService.createPlayoff(tournament, dto);
  }

  @Delete('/:id/remove-playoff')
  @Permissions([EPermission.TOURNAMENT_CRUD])
  removePlayoff(@TournamentById() tournament: Tournament) {
    return this.playoffService.removePlayoff(tournament);
  }

  @Post('/:id/join')
  joinTournament(
    @TournamentById() tournament: Tournament,
    @CurrentUser() user: User,
    @Body() dto: TournamentRegistrationDto
  ) {
    const isAdmin = matchPermissions([EPermission.TOURNAMENT_CRUD], user);

    if (!isAdmin && (dto.usersIds.length > 1 || dto.usersIds[0] !== user.id)) {
      throw new ForbiddenException();
    }

    return this.tournamentsService.joinTournament(tournament, dto);
  }

  @Post('/:id/leave')
  leaveTournament(
    @TournamentById() tournament: Tournament,
    @CurrentUser() user: User,
    @Body() dto: IdDto
  ) {
    const isAdmin = matchPermissions([EPermission.TOURNAMENT_CRUD], user);

    if (!isAdmin && dto.id !== user.id) {
      throw new ForbiddenException();
    }

    return this.tournamentsService.leaveTournament(tournament, dto);
  }

  @Get('/:id/leaderboard')
  getLeaderboard(@TournamentById() tournament: Tournament) {
    return this.leaderboardService.getLeaderboard(tournament);
  }

  @Get('/:id')
  getTournament(@TournamentById() tournament: Tournament) {
    return tournament;
  }
}

export default TournamentsController;
