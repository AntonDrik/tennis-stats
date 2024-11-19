import { Injectable } from '@nestjs/common';
import { CreateTourDto, StartTournamentDto } from '@tennis-stats/dto';
import { Tour, Tournament, User } from '@tennis-stats/entities';
import { ETournamentType } from '@tennis-stats/types';
import { MaxToursExceedException } from '../../../common/exceptions/tour.exceptions';
import { MatchService } from '../../match';
import { PairsGeneratorService } from '../../pairs-generator';
import ToursRepository from '../../tours/repository/tours.repository';
import { UsersService } from '../../users';
import { ITournamentSystem } from '../interfaces/tournament-system.interface';

@Injectable()
class RoundRobinSystemService implements ITournamentSystem {
  constructor(
    private usersService: UsersService,
    private toursRepository: ToursRepository,
    private matchService: MatchService,
    private pairsGeneratorService: PairsGeneratorService
  ) {}

  public async initialize(
    tournament: Tournament,
    dto: StartTournamentDto
  ): Promise<Tournament> {
    const allTours = await this.getRoundRobinTours(tournament);
    const firstTourPairs = this.pairsGeneratorService.toPairs(allTours[0]);

    const matches = await this.matchService.createMatches(firstTourPairs, dto.setsCount);
    const tour = this.toursRepository.createSimpleTourEntity(1, matches);

    tournament.tours = [tour];
    tournament.type = ETournamentType.ROUND_ROBIN;

    return tournament;
  }

  public async createNewTour(tournament: Tournament, dto: CreateTourDto): Promise<Tour> {
    const allTours = await this.getRoundRobinTours(tournament);
    const nextTour = allTours[tournament.nextTourNumber - 1];

    if (!nextTour) {
      throw new MaxToursExceedException();
    }

    const nextTourPairs = this.pairsGeneratorService.toPairs(nextTour);

    const matches = await this.matchService.createMatches(nextTourPairs, dto.setsCount);

    return this.toursRepository.createSimpleTourEntity(
      tournament.nextTourNumber,
      matches
    );
  }

  /**
   * Возвращает фиксированное количество туров (с парами) для переданного турнира
   */
  private async getRoundRobinTours(tournament: Tournament): Promise<User[][][]> {
    const users = await this.usersService.getJoinedUsers(tournament);
    const shiftedUsersList = this.shiftUsersList(tournament.id, users);

    return RoundRobinSystemService.GenerateTours(shiftedUsersList);
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

  static GenerateTours<T>(array: T[]): T[][][] {
    const shallowArray = [...array];
    const n = array.length;

    const result: T[][][] = [];

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

      shallowArray.splice(1, 0, shallowArray.pop() as T);
    }

    return result;
  }
}

export default RoundRobinSystemService;
