import { Injectable } from '@nestjs/common';
import { CreatePlayoffDto } from '@tennis-stats/dto';
import { Tournament, User } from '@tennis-stats/entities';
import { getPlayoffStageInfo } from '@tennis-stats/helpers';
import {
  ETournamentStatus,
  ETournamentType,
  ETourType,
  TPlayOffStage,
} from '@tennis-stats/types';
import { IsOddUsersException } from '../../../common/exceptions';
import { IPair } from '../../../common/types';
import { MatchService } from '../../match';
import ToursRepository from '../repositories/tours.repository';
import { UsersService } from '../../users';

@Injectable()
class PlayoffTournamentService {
  constructor(
    private matchService: MatchService,
    private usersService: UsersService,
    private toursRepository: ToursRepository
  ) {}

  public async createPlayoff(tournament: Tournament, dto: CreatePlayoffDto) {
    const activeUsers = await this.usersService.getUsersForPlayoff(dto);

    const nextRounds = getPlayoffStageInfo(dto.stage).nextRounds;

    const firstTour = this.createFirstTour(activeUsers, dto);
    const restTours = this.createRestTours(dto.setsCount, nextRounds);

    tournament.tours.push(firstTour, ...restTours);
    tournament.type = ETournamentType.PLAYOFF;

    return tournament;
  }

  public async attachPlayoff(tournament: Tournament, dto: CreatePlayoffDto) {
    const currentType = tournament.type;

    const entity = await this.createPlayoff(tournament, dto);
    entity.type = currentType;

    await entity.save();

    return entity;
  }

  public async removePlayoff(tournament: Tournament) {
    tournament.status = ETournamentStatus.ACTIVE;
    tournament.tours = tournament.tours.filter((tour) => tour.type === ETourType.SIMPLE);

    await tournament.save();
  }

  private createFirstTour(activeUsers: User[], dto: CreatePlayoffDto) {
    const pairs = this.getPlayoffPairs(activeUsers);
    const matches = this.matchService.createMatches(pairs, dto.setsCount, true);

    return this.toursRepository.createPlayOffTourEntity(dto.stage, matches);
  }

  private createRestTours(setsCount: number, restStages: TPlayOffStage[]) {
    return restStages.map((stage) => {
      const matches = this.matchService.createEmptyPlayoffStage(stage, setsCount);

      return this.toursRepository.createPlayOffTourEntity(stage, matches);
    });
  }

  private getPlayoffPairs(users: User[]): IPair[] {
    if (users.length % 2 !== 0) {
      throw new IsOddUsersException();
    }

    let left = 0;
    let right = users.length - 1;

    let resultLeft = 0;
    let resultRight = Math.ceil(right / 2) - 1;

    const result: IPair[] = [];

    while (left < right) {
      if (left % 2 === 0) {
        result[resultLeft] = {
          user1: users[left],
          user2: users[right],
        };

        resultLeft++;
      } else {
        result[resultRight] = {
          user1: users[left],
          user2: users[right],
        };

        resultRight--;
      }

      left++;
      right--;
    }

    return result;
  }
}

export default PlayoffTournamentService;
