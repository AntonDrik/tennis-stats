import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tournament } from '@tennis-stats/entities';
import { LeaderboardModule } from '../leaderboard';
import { MatchModule } from '../match';
import { PairsGeneratorModule } from '../pairs-generator';
import { RatingModule } from '../rating';
import { TourModule } from '../tours';
import { UsersModule } from '../users';
import TournamentsController from './controllers/tournaments.controller';
import TournamentsRepository from './repositories/tournaments.repository';
import PlayoffService from './services/playoff.service';
import TournamentsService from './services/tournaments.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Tournament]),
    UsersModule,
    TourModule,
    MatchModule,
    LeaderboardModule,
    PairsGeneratorModule,
    RatingModule,
  ],
  controllers: [TournamentsController],
  providers: [
    TournamentsService,
    TournamentsService,
    TournamentsRepository,
    PlayoffService,
  ],
  exports: [],
})
class TournamentsModule {}

export default TournamentsModule;
