import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission, Player, User, UserAuth } from '@tennis-stats/entities';
import { UsersRepository, UsersAuthRepository, TournamentsRepository } from '../../repositories';
import { LeaderboardModule } from '../leaderboard';
import { RatingModule } from '../rating';
import UsersController from './controllers/users.controller';
import UserStatsService from './services/user-stats.service';
import UsersService from './services/users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Player, UserAuth, Permission]),
    RatingModule,
    LeaderboardModule,
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    UserStatsService,
    UsersRepository,
    UsersAuthRepository,
    TournamentsRepository,
  ],
  exports: [UsersService],
})
class UsersModule {}

export default UsersModule;
