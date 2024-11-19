import { Injectable } from '@nestjs/common';
import { CreatePlayoffDto } from '@tennis-stats/dto';
import { Player, Tournament } from '@tennis-stats/entities';
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
    const users = await this.repository.find();

    const promise = users.map(async (user) => {
      const ratingDiff = await this.ratingHistoryService.getDailyRatingDiff(user);

      return { ...user, ratingDiff };
    });

    const result = await Promise.all(promise);

    return result.sort(
      (a, b) => b.rating - a.rating || b.nickname.localeCompare(a.nickname)
    );
  }

  public async getJoinedUsers(tournament: Tournament) {
    const joinedUsersIds = tournament.registeredUsers?.map((user) => user.id) ?? [];

    return this.getListOfEvenUsers(joinedUsersIds);
  }

  public getUsersForPlayoff(dto: CreatePlayoffDto) {
    let ids = dto.activeUsersIds;

    if (dto.stage === '1/8') {
      ids = ids.slice(0, 16);
    }

    if (dto.stage === '1/4') {
      ids = ids.slice(0, 8);
    }

    return this.getListOfEvenUsers(ids);
  }

  public async createPlayer(userId: number) {
    const user = await this.repository.findById(userId);

    const player = new Player();

    player.user = user;
    player.score = 0;

    return player;
  }

  /**
   * Возвращает entity пользователей по списку ID.
   * Если пользователей нечетное кол-во, то добавляет Халяву
   */
  private async getListOfEvenUsers(joinedUsersIds: number[]) {
    const users = await this.repository.findByIds(joinedUsersIds);

    if (users.length % 2 !== 0) {
      return [...users, await this.getSystemUser()];
    }

    return users.sort(
      (a, b) => joinedUsersIds.indexOf(a.id) - joinedUsersIds.indexOf(b.id)
    );
  }

  private getSystemUser() {
    return this.repository.findByNickname('Халява');
  }
}

export default UsersService;
