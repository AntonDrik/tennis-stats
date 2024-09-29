import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameSet, Match } from '@tennis-stats/entities';
import { UsersModule } from '../users';
import MatchController from './controllers/match.controller';
import GameSetRepository from './repositories/game-set.repository';
import MatchRepository from './repositories/match.repository';
import GameSetService from './services/game-set.service';
import MatchService from './services/match.service';
import PairsGeneratorService from './services/pairs-generator.service';

@Module({
  imports: [TypeOrmModule.forFeature([Match, GameSet]), UsersModule],
  controllers: [MatchController],
  providers: [
    MatchService,
    GameSetService,
    MatchRepository,
    GameSetRepository,
    PairsGeneratorService,
  ],
  exports: [MatchService, GameSetService, MatchRepository, GameSetRepository],
})
class MatchModule {}

export default MatchModule;
