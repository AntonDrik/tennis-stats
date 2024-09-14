import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player, PlayerStat, StatsDictionary } from '@tennis-stats/entities';
import { UsersModule } from '../users';
import PlayersRepository from './players.repository';
import PlayersService from './players.service';


@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([Player, PlayerStat, StatsDictionary])
  ],
  controllers: [],
  providers: [PlayersService, PlayersRepository],
  exports: [PlayersService, PlayersRepository]
})
class PlayersModule {}

export default PlayersModule;
