import { Injectable } from '@nestjs/common';
import { CreateTourDto, StartTournamentDto } from '@tennis-stats/dto';
import { Tour, Tournament, User } from '@tennis-stats/entities';
import { ETournamentType } from '@tennis-stats/types';
import { MaxToursExceedException } from '../../../common/exceptions/tour.exceptions';
import { IPair } from '../../../common/types';
import { MatchService } from '../../match';
import ToursRepository from '../repositories/tours.repository';

@Injectable()
class RoundRobinTournamentService {
  constructor(private toursRepository: ToursRepository, private matchService: MatchService) {}

  public initialize(tournament: Tournament, dto: StartTournamentDto): Tournament {
    const allTours = this.getRoundRobinTours(tournament);
    const firstTourPairs = this.getPairs(allTours[0]);

    const matches = this.matchService.createMatches(firstTourPairs, dto.setsCount);
    const tour = this.toursRepository.createSimpleTourEntity(1, matches);

    tournament.tours = [tour];
    tournament.type = ETournamentType.ROUND_ROBIN;

    return tournament;
  }

  public createNewTour(tournament: Tournament, dto: CreateTourDto): Tour {
    const allTours = this.getRoundRobinTours(tournament);
    const nextTour = allTours[tournament.helpers.getNextTourNumber() - 1];

    if (!nextTour) {
      throw new MaxToursExceedException();
    }

    const nextTourPairs = this.getPairs(nextTour);

    const matches = this.matchService.createMatches(nextTourPairs, dto.setsCount);

    return this.toursRepository.createSimpleTourEntity(
      tournament.helpers.getNextTourNumber(),
      matches
    );
  }

  /**
   * Возвращает фиксированное количество туров (с парами) для переданного турнира
   */
  private getRoundRobinTours(tournament: Tournament): User[][][] {
    const shiftedUsersList = this.shiftUsersList(tournament.id, tournament.registeredUsers);

    return this.generateTours(shiftedUsersList);
  }

  /**
   * Изменяет очередность пользователей таким образом, чтобы для каждого турнира создавались уникальные раунды
   */
  private shiftUsersList(tournamentId: number, users: User[]): User[] {
    const rotateCount = tournamentId % users.length;
    const len = users.length;

    users.push(...users.splice(0, (-rotateCount + len) % len));

    return users;
  }

  private getPairs(users: User[][]): IPair[] {
    return users.reduce((acc, curr) => {
      acc.push({
        user1: curr[0],
        user2: curr[1],
      });

      return acc;
    }, [] as IPair[]);
  }

  private generateTours(array: User[]): User[][][] {
    const shallowArray = [...array];
    const n = array.length;

    const result: User[][][] = [];

    if (n % 2 !== 0) {
      throw new Error('Only even');
    }

    for (let j = 0; j < n - 1; j += 1) {
      result[j] = [];

      for (let i = 0; i < n / 2; i += 1) {
        const o = n - 1 - i;

        const isHome = i === 0 && j % 2 === 1;

        result[j].push([
          isHome ? shallowArray[o] : shallowArray[i],
          isHome ? shallowArray[i] : shallowArray[o],
        ]);
      }

      shallowArray.splice(1, 0, shallowArray.pop() as User);
    }

    return result;
  }
}

export default RoundRobinTournamentService;
