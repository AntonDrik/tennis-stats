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
import { EPermission, ETournamentStatus } from '@tennis-stats/types';
import { CurrentUser, Permissions } from '../../../auth/decorators';
import { ForbiddenException } from '../../../common/exceptions';
import { matchPermissions } from '../../../common/utils';
import { LeaderboardService } from '../../leaderboard';
import { TournamentById } from '../decorators/tournament.decorator';
import checkStatus from '../helpers/check-tournament-status';
import TournamentUsersManagerService from '../services/tournament-users-manager.service';
import TournamentService from '../services/tournament.service';
import PlayoffTournamentService from '../systems/playoff-tournament.service';

@Controller('tournaments')
class TournamentsController {
  constructor(
    private tournamentsService: TournamentService,
    private tournamentUsersManagerService: TournamentUsersManagerService,
    private leaderboardService: LeaderboardService,
    private playoffService: PlayoffTournamentService
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

  @Get('/:id')
  getTournament(@TournamentById() tournament: Tournament) {
    return tournament;
  }

  @Get('/:id/leaderboard')
  getLeaderboard(@TournamentById() tournament: Tournament) {
    return this.leaderboardService.getLeaderboard(tournament);
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

  @Post('/:id/attach-playoff')
  @Permissions([EPermission.TOURNAMENT_CRUD])
  attachPlayoff(@TournamentById() tournament: Tournament, @Body() dto: CreatePlayoffDto) {
    checkStatus(tournament, [ETournamentStatus.ACTIVE]);

    return this.playoffService.attachPlayoff(tournament, dto);
  }

  @Delete('/:id/detach-playoff')
  @Permissions([EPermission.TOURNAMENT_CRUD])
  detachPlayoff(@TournamentById() tournament: Tournament) {
    checkStatus(tournament, [ETournamentStatus.ACTIVE]);

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

    return this.tournamentUsersManagerService.joinTournament(tournament, dto);
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

    return this.tournamentUsersManagerService.leaveTournament(tournament, dto);
  }

  @Post('/:id/add-user')
  @Permissions([EPermission.TOURNAMENT_CRUD])
  addUser(@TournamentById() tournament: Tournament, @Body() dto: IdDto) {
    return this.tournamentUsersManagerService.addUserToActiveTournament(tournament, dto);
  }
}

export default TournamentsController;
