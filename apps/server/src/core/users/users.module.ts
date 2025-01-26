import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission, Player, User, UserAuth } from '@tennis-stats/entities';
import { UsersRepository, UsersAuthRepository } from '../../repositories';
import { RatingModule } from '../rating';
import UsersController from './controllers/users.controller';
import UsersService from './services/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Player, UserAuth, Permission]), RatingModule],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, UsersAuthRepository],
  exports: [UsersService],
})
class UsersModule {}

export default UsersModule;
