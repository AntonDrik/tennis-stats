import { Injectable } from '@nestjs/common';
import { CreatePlayoffDto } from '@tennis-stats/dto';
import { Player } from '@tennis-stats/entities';
import { IUserWithRatingDiff } from '@tennis-stats/types';
import { DataSource } from 'typeorm';
import { RatingHistoryService } from '../rating';
import UsersRepository from './users.repository';

@Injectable()
class UsersService {
  constructor(
    private dataSource: DataSource,
    private ratingHistoryService: RatingHistoryService,
    private repository: UsersRepository
  ) {}

  public async getAll(): Promise<IUserWithRatingDiff[]> {
    const users = await this.repository.find({ order: { rating: 'DESC' } });

    const promise = users.map(async (user) => {
      const ratingDiff = await this.ratingHistoryService.getDailyRatingDiff(user);

      return { ...user, ratingDiff };
    });

    return Promise.all(promise);
  }

  public async getUsersForTournament(registeredUsersIds: number[]) {
    const users = await this.repository.findByIds(registeredUsersIds);

    if (users.length % 2 !== 0) {
      return [...users, await this.getSystemUser()];
    }

    return users;
  }

  public async getUsersForPlayoff(dto: CreatePlayoffDto) {
    let ids = dto.activeUsersIds;

    if (dto.round === '1/8') {
      ids = ids.slice(0, 16);
    }

    if (dto.round === '1/4') {
      ids = ids.slice(0, 8);
    }

    return await this.getUsersForTournament(ids);
  }

  public getSystemUser() {
    return this.repository.findByNickname('Халява');
  }

  public async createPlayer(userId: number) {
    const user = await this.repository.findById(userId);

    const player = new Player();

    player.user = user;
    player.score = 0;

    return player;
  }
}

export default UsersService;
