import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tour, Tournament } from '@tennis-stats/entities';
import { LeaderboardModule } from '../leaderboard';
import { MatchModule } from '../match';
import { RatingModule } from '../rating';
import { UsersModule } from '../users';
import TournamentsController from './controllers/tournaments.controller';
import ToursController from './controllers/tours.controller';
import TournamentsRepository from './repositories/tournaments.repository';
import ToursRepository from './repositories/tours.repository';
import TournamentUsersManagerService from './services/tournament-users-manager.service';
import PlayoffTournamentService from './systems/playoff-tournament.service';
import RoundRobinTournamentService from './systems/round-robin-tournament.service';
import SwissTournamentService from './systems/swiss-tournament.service';
import ToursService from './services/tour.service';
import TournamentService from './services/tournament.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Tournament, Tour]),
    UsersModule,
    MatchModule,
    LeaderboardModule,
    RatingModule,
  ],
  controllers: [TournamentsController, ToursController],
  providers: [
    TournamentService,
    ToursService,
    TournamentsRepository,
    ToursRepository,
    TournamentUsersManagerService,
    RoundRobinTournamentService,
    SwissTournamentService,
    PlayoffTournamentService,
  ],
  exports: [],
})
class TournamentsModule {}

export default TournamentsModule;
