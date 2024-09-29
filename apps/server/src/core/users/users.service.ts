import { Injectable } from '@nestjs/common';
import { CreatePlayoffDto } from '@tennis-stats/dto';
import { Match, Player, Tour, User } from '@tennis-stats/entities';
import { getRatingDelta } from '@tennis-stats/helpers';
import { IUserWithRatingDiff, TPlayoffRounds } from '@tennis-stats/types';
import { DataSource, EntityManager } from 'typeorm';
import {
  MatchNotFoundException,
  TournamentNotFoundException,
} from '../../common/exceptions';
import { RatingHistoryService } from '../rating-history';
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
      const ratingDiff = await this.ratingHistoryService
        .getRatingDiff(user)
        .catch(() => null);

      return {
        ...user,
        ratingDiff: ratingDiff ?? '+0',
      };
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

  public async updateRating(
    tour: Tour | null,
    match: Match | null,
    transactionManager?: EntityManager
  ) {
    if (!tour) {
      throw new TournamentNotFoundException();
    }

    if (!match) {
      throw new MatchNotFoundException();
    }

    const players = match.getWinnerLooser();

    if (!players) {
      return;
    }

    const { winner, looser } = players;

    const delta = getRatingDelta(
      winner.rating,
      looser.rating,
      tour,
      match.totalScore
    );

    await this.repository.withTransaction(async (manager) => {
      await manager.update(
        User,
        { id: winner.id },
        {
          rating: winner.rating + delta,
        }
      );

      await manager.update(
        User,
        { id: looser.id },
        {
          rating: looser.rating - delta,
        }
      );

      // const allUsers = await manager.find(User);
      // await this.ratingHistoryService.makeSnapshot(
      //   allUsers,
      //   match.tour.date,
      //   manager
      // );
    }, transactionManager);
  }
}

export default UsersService;
