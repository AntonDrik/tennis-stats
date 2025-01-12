import { Injectable } from '@nestjs/common';
import { CreateTourDto, StartTournamentDto } from '@tennis-stats/dto';
import { chunk, shuffleArray } from '@tennis-stats/helpers';
import { ETournamentType } from '@tennis-stats/types';
import { IsOddUsersException } from '../../../common/exceptions';
import { IPair } from '../../../common/types';
import { LeaderboardService } from '../../leaderboard';
import { MatchService } from '../../match';
import ToursRepository from '../repositories/tours.repository';
import { Tournament, Tour, User } from '@tennis-stats/entities';

@Injectable()
class SwissTournamentService {
  constructor(
    private toursRepository: ToursRepository,
    private matchService: MatchService,
    private leaderboardService: LeaderboardService
  ) {}

  public initialize(tournament: Tournament, dto: StartTournamentDto): Tournament {
    const pairs = this.getPairsByRating(tournament.registeredUsers);

    const matches = this.matchService.createMatches(pairs, dto.setsCount);
    const tour = this.toursRepository.createSimpleTourEntity(1, matches);

    tournament.tours = [tour];
    tournament.type = ETournamentType.SWISS_SYSTEM;

    return tournament;
  }

  public createNewTour(tournament: Tournament, dto: CreateTourDto): Tour {
    const pairs = this.getPairsByLeaderboard(tournament);

    const matches = this.matchService.createMatches(pairs, dto.setsCount);

    return this.toursRepository.createSimpleTourEntity(
      tournament.helpers.getNextTourNumber(),
      matches
    );
  }

  private getPairsByRating(users: User[]): IPair[] {
    if (users.length % 2 !== 0) {
      throw new IsOddUsersException();
    }

    const middle = users.length / 2;

    const firstPart = users.slice(0, middle);
    const secondPart = users.slice(middle, users.length);

    const result: IPair[] = Array.from({ length: middle }, (_, i) => {
      return {
        user1: firstPart[i],
        user2: secondPart[i],
      };
    });

    return shuffleArray(result);
  }

  private getPairsByLeaderboard(tournament: Tournament): IPair[] {
    const { toursLeaderboard } = this.leaderboardService.getLeaderboard(tournament);
    const users = toursLeaderboard.map((item) => item.user) as User[];

    if (users.length % 2 !== 0) {
      throw new IsOddUsersException();
    }

    const result: IPair[] = [];

    chunk(users, 2).forEach((chunk) => {
      result.push({
        user1: chunk[0],
        user2: chunk[1],
      });
    });

    return shuffleArray(result);
  }
}

export default SwissTournamentService;
