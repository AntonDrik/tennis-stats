import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tournament } from '@tennis-stats/entities';
import { MatchModule } from '../match';
import RatingModule from '../rating/rating.module';
import { TourModule } from '../tours';
import { UsersModule } from '../users';
import OpenedTournamentController from './controllers/opened-tournament.controller';
import TournamentsController from './controllers/tournaments.controller';
import TournamentsRepository from './repositories/tournaments.repository';
import LeaderboardService from './services/leaderboard.service';
import OpenedTournamentService from './services/opened-tournament.service';
import PlayoffService from './services/playoff.service';
import TournamentsService from './services/tournaments.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Tournament]),
    UsersModule,
    TourModule,
    MatchModule,
    RatingModule,
  ],
  controllers: [OpenedTournamentController, TournamentsController],
  providers: [
    TournamentsService,
    OpenedTournamentService,
    TournamentsRepository,
    LeaderboardService,
    PlayoffService,
  ],
  exports: [TournamentsRepository],
})
class TournamentsModule {}

export default TournamentsModule;
