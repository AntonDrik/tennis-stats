import { Injectable } from '@nestjs/common';
import { CreatePlayoffDto } from '@tennis-stats/dto';
import { Player, Tournament } from '@tennis-stats/entities';
import { IUserWithRatingDiff } from '@tennis-stats/types';
import { DataSource } from 'typeorm';
import { RatingHistoryService, RatingService } from '../rating';
import UsersRepository from './users.repository';

@Injectable()
class UsersService {
  constructor(
    private dataSource: DataSource,
    private ratingService: RatingService,
    private ratingHistoryService: RatingHistoryService,
    private repository: UsersRepository
  ) {}

  public async getAllWithRating(): Promise<IUserWithRatingDiff[]> {
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

  public getJoinedUsers(tournament: Tournament) {
    const joinedUsersIds = tournament.registeredUsers?.map((user) => user.id) ?? [];

    return this.getEvenUsersList(joinedUsersIds);
  }

  public async getUsersForPlayoff(dto: CreatePlayoffDto) {
    let ids = dto.activeUsersIds;

    if (dto.stage === '1/8') {
      ids = ids.slice(0, 16);
    }

    if (dto.stage === '1/4') {
      ids = ids.slice(0, 8);
    }

    const users = await this.getEvenUsersList(ids);

    return users.sort((a, b) => ids.indexOf(a.id) - ids.indexOf(b.id));
  }

  public async createPlayer(userId: number) {
    const user = await this.repository.findById(userId);

    const player = new Player();

    player.user = user;
    player.score = 0;

    return player;
  }

  // TODO: сделать отдельный модуль Settings и перенести эту ручку туда
  public async resetRating() {
    const allUsers = await this.repository.find();

    await this.dataSource.transaction(async (manager) => {
      await this.ratingService.resetRating(allUsers, manager);
    });
  }

  /**
   * Возвращает entity пользователей по списку ID.
   * Если пользователей нечетное кол-во, то добавляет Халяву
   */
  private async getEvenUsersList(joinedUsersIds: number[]) {
    const users = await this.repository.findByIds(joinedUsersIds);

    if (users.length % 2 !== 0) {
      return [...users, await this.getSystemUser()];
    }

    return users;
  }

  private getSystemUser() {
    return this.repository.findByNickname('Халява');
  }
}

export default UsersService;
