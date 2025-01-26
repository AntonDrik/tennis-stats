import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tour, Tournament } from '@tennis-stats/entities';
import { LeaderboardModule } from '../leaderboard';
import { MatchModule } from '../match';
import { RatingModule } from '../rating';
import { SeasonsModule } from '../seasons';
import { UsersModule } from '../users';
import TournamentsController from './controllers/tournaments.controller';
import ToursController from './controllers/tours.controller';
import { TournamentsRepository, ToursRepository, UsersRepository } from '../../repositories';
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
    SeasonsModule,
  ],
  controllers: [TournamentsController, ToursController],
  providers: [
    TournamentService,
    ToursService,
    TournamentUsersManagerService,
    RoundRobinTournamentService,
    SwissTournamentService,
    PlayoffTournamentService,

    TournamentsRepository,
    ToursRepository,
    UsersRepository,
  ],
  exports: [],
})
class TournamentsModule {}

export default TournamentsModule;
