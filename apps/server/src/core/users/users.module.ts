import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player, User, UserAuth } from '@tennis-stats/entities';
import { RatingModule } from '../rating';
import UsersAuthRepository from './repositories/users-auth.repository';
import UsersRepository from './repositories/users.repository';
import UsersController from './controllers/users.controller';
import UsersService from './services/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Player, UserAuth]), RatingModule],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, UsersAuthRepository],
  exports: [UsersService, UsersRepository, UsersAuthRepository],
})
class UsersModule {}

export default UsersModule;
