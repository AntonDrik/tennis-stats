import { Injectable } from '@nestjs/common';
import { CreateTourDto } from '@tennis-stats/dto';
import { Tour, Tournament } from '@tennis-stats/entities';
import { ETournamentStatus } from '@tennis-stats/types';
import { DataSource } from 'typeorm';
import {
  UnableAddTourException,
  UnableRemoveTourException,
} from '../../../common/exceptions/tour.exceptions';
import { MatchService } from '../../match';
import ToursRepository from '../repository/tours.repository';

@Injectable()
class ToursService {
  constructor(
    private repository: ToursRepository,
    private dataSource: DataSource,
    private matchService: MatchService
  ) {}

  public async addTourForTournament(tournament: Tournament, dto: CreateTourDto) {
    if (tournament.status !== ETournamentStatus.ACTIVE) {
      throw new UnableAddTourException();
    }

    const tournamentUsers = tournament.registeredUsers;
    const lastTourNumber = tournament.lastTourNumber + 1;

    const matches = await this.matchService.createMatches(tournamentUsers, dto);
    const tour = this.repository.createSimpleTourEntity(dto, lastTourNumber, matches);

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