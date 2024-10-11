import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { UpsertTournamentDto, GetToursQuery } from '@tennis-stats/dto';
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
}

export default TournamentsController;
