import { Injectable } from '@nestjs/common';
import { CreateTourDto } from '@tennis-stats/dto';
import { Tour, Tournament } from '@tennis-stats/entities';
import { ETourGenerator, ETournamentStatus } from '@tennis-stats/types';
import {
  UnableAddTourException,
  UnableRemoveTourException,
} from '../../../common/exceptions/tour.exceptions';
import { MatchService } from '../../match';
import { IPair } from '../../match/interfaces/pair.interface';
import { PairsGeneratorService } from '../../pairs-generator';
import { UsersService } from '../../users';
import ToursRepository from '../repository/tours.repository';

@Injectable()
class ToursService {
  constructor(
    private repository: ToursRepository,
    private matchService: MatchService,
    private usersService: UsersService,
    private pairsGeneratorService: PairsGeneratorService
  ) {}

  public async addTourForTournament(tournament: Tournament, dto: CreateTourDto) {
    if (tournament.status !== ETournamentStatus.ACTIVE) {
      throw new UnableAddTourException();
    }

    const users = await this.usersService.getJoinedUsers(tournament);

    let pairs: IPair[] = [];

    if (dto.pairsGenerator === ETourGenerator.RANDOM) {
      pairs = this.pairsGeneratorService.generateByRandom(users);
    }

    if (dto.pairsGenerator === ETourGenerator.BY_RATING) {
      pairs = this.pairsGeneratorService.generateByRating(users);
    }

    if (dto.pairsGenerator === ETourGenerator.BY_LEADERBOARD) {
      pairs = this.pairsGeneratorService.generateByLeaderboard(tournament);
    }

    const matches = await this.matchService.createMatches(pairs, dto.setsCount);
    const tour = this.repository.createSimpleTourEntity(
      dto.setsCount,
      tournament.nextTourNumber,
      matches
    );

    tournament.tours.push(tour);
    await tournament.save();

    return tour;
  }

  public async removeTour(tournament: Tournament, tour: Tour | number) {
    if (tournament.status !== ETournamentStatus.ACTIVE) {
      throw new UnableRemoveTourException();
    }

    if (typeof tour === 'number') {
      tour = await this.repository.findById(tour);
    }

    await tour.remove();

    return tour;
  }
}

export default ToursService;
