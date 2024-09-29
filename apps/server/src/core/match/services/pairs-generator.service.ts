import { Injectable } from '@nestjs/common';
import { User } from '@tennis-stats/entities';
import { ETourGenerator } from '@tennis-stats/types';
import { IsOddUsersException } from '../../../common/exceptions';
import { IPair } from '../interfaces/pair.interface';

@Injectable()
class PairsGeneratorService {
  public generatePairs(users: User[], generator: ETourGenerator): IPair[] {
    if (generator === ETourGenerator.RANDOM) {
      return this.generatePairsByRandom(users);
    }

    // if (generator === EMatchesGenerator.BY_RATING) {
    //   return []
    // }

    return this.generatePairsByRandom(users);
  }

  private generatePairsByRandom(users: User[]): IPair[] {
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
}

export default PairsGeneratorService;
