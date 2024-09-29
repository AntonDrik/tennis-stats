import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player, User, UserAuth } from '@tennis-stats/entities';
import { RatingHistoryModule } from '../rating-history';
import UsersAuthRepository from './users-auth.repository';
import UsersRepository from './users.repository';
import UsersController from './users.controller';
import UsersService from './users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Player, UserAuth]),
    RatingHistoryModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, UsersAuthRepository],
  exports: [UsersService, UsersRepository, UsersAuthRepository],
})
class UsersModule {}

export default UsersModule;
