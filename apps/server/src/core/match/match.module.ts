import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameSet, Match } from '@tennis-stats/entities';
import { GameSetRepository, MatchRepository } from '../../repositories';
import { UsersModule } from '../users';
import MatchController from './controllers/match.controller';
import GameSetService from './services/game-set.service';
import MatchService from './services/match.service';

@Module({
  imports: [TypeOrmModule.forFeature([Match, GameSet]), UsersModule],
  controllers: [MatchController],
  providers: [MatchService, GameSetService, MatchRepository, GameSetRepository],
  exports: [MatchService],
})
class MatchModule {}

export default MatchModule;
