import { Injectable } from '@nestjs/common';
import { Tournament, User } from '@tennis-stats/entities';
import { chunk, shuffleArray } from '@tennis-stats/helpers';
import { IsOddUsersException } from '../../../common/exceptions';
import { LeaderboardService } from '../../leaderboard';
import { IPair } from '../../match/interfaces/pair.interface';

@Injectable()
class PairsGeneratorService {
  constructor(private leaderboardService: LeaderboardService) {}

  public generateByRandom(users: User[]): IPair[] {
    const arr = [...users];

    if (arr.length % 2 !== 0) {
      throw new IsOddUsersException();
    }

    const arrayLength = arr.length;
    const result: IPair[] = [];

    for (let i = 0; i < arrayLength / 2; i++) {
      const user1 = arr.splice(Math.floor(Math.random() * arr.length), 1);
      const user2 = arr.splice(Math.floor(Math.random() * arr.length), 1);

      result.push({
        user1: user1[0],
        user2: user2[0],
      });
    }

    return result;
  }

  public generateByRating(users: User[]): IPair[] {
    const sortedUsers = [...users].sort(
      (a, b) => b.rating - a.rating || b.nickname.localeCompare(a.nickname)
    );

    if (sortedUsers.length % 2 !== 0) {
      throw new IsOddUsersException();
    }

    const arrayCenter = sortedUsers.length / 2;
    const middle = arrayCenter % 2 === 0 ? arrayCenter : arrayCenter + 1;

    const firstPart = sortedUsers.slice(0, middle);
    const secondPart = sortedUsers.slice(middle, sortedUsers.length);

    const result = [
      ...this.generateByRandom(firstPart),
      ...this.generateByRandom(secondPart),
    ];

    return shuffleArray(result);
  }

  /**
   * Генерация по швейцарской системе на основе таблицы лидеров.
   *  1 - 2
   *  3 - 4
   *  5 - 6
   *  ...
   */
  public generateByLeaderboard(tournament: Tournament): IPair[] {
    const { toursLeaderboard } = this.leaderboardService.getLeaderboard(tournament);
    const users = toursLeaderboard.map((item) => item.user) as User[];

    if (users.length % 2 !== 0) {
      throw new IsOddUsersException();
    }

    const chunkedUsers = chunk(users, 2);

    const result: IPair[] = [];

    chunkedUsers.forEach((chunk) => {
      result.push({
        user1: chunk[0],
        user2: chunk[1],
      });
    });

    return shuffleArray(result);
  }

  public generateFirstWithLast(users: User[]) {
    if (users.length % 2 !== 0) {
      throw new IsOddUsersException();
    }

    let left = 0;
    let right = users.length - 1;
    const result: IPair[] = [];

    while (left < right) {
      result.push({
        user1: users[left],
        user2: users[right],
      });

      left++;
      right--;
    }

    return result;
  }
}

export default PairsGeneratorService;
