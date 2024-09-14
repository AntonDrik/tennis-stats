import { Injectable } from '@nestjs/common';
import { Player } from '@tennis-stats/entities';
import { DataSource } from 'typeorm';
import { UsersRepository } from '../users';


@Injectable()
class PlayersService {

  constructor(
    private dataSource: DataSource,
    private usersRepository: UsersRepository
  ) {
  }

  public async getPlayerEntity(userId: number) {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      return;
    }

    const player = new Player();

    player.user = user;
    player.score = 0;

    return player;
  }

}

export default PlayersService;
