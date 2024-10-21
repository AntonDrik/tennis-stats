import { Module } from '@nestjs/common';
import { LeaderboardModule } from '../leaderboard';
import PairsGeneratorService from './services/pairs-generator.service';

@Module({
  imports: [LeaderboardModule],
  controllers: [],
  providers: [PairsGeneratorService],
  exports: [PairsGeneratorService],
})
class PairsGeneratorModule {}

export default PairsGeneratorModule;
