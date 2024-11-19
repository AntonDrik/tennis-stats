import { Module } from '@nestjs/common';
import { MatchModule } from '../match';
import { PairsGeneratorModule } from '../pairs-generator';
import { TourModule } from '../tours';
import { UsersModule } from '../users';
import TournamentSystemsFacade from './services/facade.service';
import RoundRobinSystemService from './services/round-robin-system.service';
import SwissSystemService from './services/swiss-system.service';

@Module({
  imports: [MatchModule, TourModule, UsersModule, PairsGeneratorModule],
  providers: [TournamentSystemsFacade, RoundRobinSystemService, SwissSystemService],
  exports: [TournamentSystemsFacade],
})
export default class TournamentSystemsModule {}
