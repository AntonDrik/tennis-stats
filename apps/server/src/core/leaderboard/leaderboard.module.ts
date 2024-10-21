import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TournamentLeaderboard } from '@tennis-stats/entities';
import LeaderboardRepository from './repository/leaderboard.repository';
import LeaderboardService from './services/leaderboard.service';

@Module({
  imports: [TypeOrmModule.forFeature([TournamentLeaderboard])],
  controllers: [],
  providers: [LeaderboardService, LeaderboardRepository],
  exports: [LeaderboardService],
})
class LeaderboardModule {}

export default LeaderboardModule;
