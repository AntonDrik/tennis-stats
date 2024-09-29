import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { UpsertTournamentDto, GetToursQuery, IdDto } from '@tennis-stats/dto';
import { Tournament } from '@tennis-stats/entities';
import { EPermission } from '@tennis-stats/types';
import { Permissions } from '../../../auth/decorators';
import { TournamentById } from '../decorators/tournament.decorator';
import LeaderboardService from '../services/leaderboard.service';
import TournamentsService from '../services/tournaments.service';

@Controller('tournaments')
class TournamentsController {
  constructor(
    private tournamentsService: TournamentsService,
    private leaderboardService: LeaderboardService
  ) {}

  @Get()
  getTournamentsList(@Query() query: GetToursQuery) {
    return this.tournamentsService.getTournamentsList(query);
  }

  @Get('/:id/leaderboard')
  getLeaderboard(@TournamentById() tournament: Tournament) {
    return this.leaderboardService.getLeaderboard(tournament);
  }

  @Get('/:id')
  getTournament(@TournamentById() tournament: Tournament) {
    return tournament;
  }

  @Post('/create')
  @Permissions([EPermission.TOURNAMENT_CRUD])
  createTournament(@Body() dto: UpsertTournamentDto) {
    return this.tournamentsService.createTournament(dto);
  }

  @Delete('/:id/delete')
  @Permissions([EPermission.TOURNAMENT_CRUD])
  deleteTournament(@Body() dto: IdDto) {
    return this.tournamentsService.deleteTournament(dto.id);
  }
}

export default TournamentsController;
