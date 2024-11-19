import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tournament } from '@tennis-stats/entities';
import { LeaderboardModule } from '../leaderboard';
import { MatchModule } from '../match';
import { PairsGeneratorModule } from '../pairs-generator';
import { RatingModule } from '../rating';
import { TournamentSystemsModule } from '../tournament-systems';
import { TourModule } from '../tours';
import { UsersModule } from '../users';
import TournamentsController from './controllers/tournaments.controller';
import ToursController from './controllers/tours.controller';
import TournamentsRepository from './repositories/tournaments.repository';
import PlayoffService from './services/playoff.service';
import TournamentService from './services/tournament.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Tournament]),
    UsersModule,
    TourModule,
    MatchModule,
    LeaderboardModule,
    PairsGeneratorModule,
    RatingModule,
    TournamentSystemsModule,
  ],
  controllers: [TournamentsController, ToursController],
  providers: [
    TournamentService,
    TournamentService,
    TournamentsRepository,
    PlayoffService,
  ],
  exports: [],
})
class TournamentsModule {}

export default TournamentsModule;
