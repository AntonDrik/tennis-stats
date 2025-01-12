import { Injectable } from '@nestjs/common';
import { CreateTourDto } from '@tennis-stats/dto';
import { Tour, Tournament } from '@tennis-stats/entities';
import { ETournamentStatus, ETournamentType } from '@tennis-stats/types';
import {
  UnableAddTourException,
  UnableRemoveTourException,
} from '../../../common/exceptions/tour.exceptions';
import checkStatus from '../helpers/check-tournament-status';
import ToursRepository from '../repositories/tours.repository';
import RoundRobinTournamentService from '../systems/round-robin-tournament.service';
import SwissTournamentService from '../systems/swiss-tournament.service';

@Injectable()
class ToursService {
  constructor(
    private tourRepository: ToursRepository,
    private roundRobinTournamentService: RoundRobinTournamentService,
    private swissTournamentService: SwissTournamentService
  ) {}

  /**
   * Добавляет тур в турнир. Логика добавления разная в зависимости от турнирной системы
   */
  public async addTour(tournament: Tournament, dto: CreateTourDto) {
    checkStatus(tournament, [ETournamentStatus.ACTIVE], new UnableAddTourException());

    if (tournament.hasPlayoff) {
      throw new UnableAddTourException('Нельзя добавить тур потому что запущен плей-офф');
    }

    let tour = null;

    if (tournament.type === ETournamentType.ROUND_ROBIN) {
      tour = this.roundRobinTournamentService.createNewTour(tournament, dto);
    }

    if (tournament.type === ETournamentType.SWISS_SYSTEM) {
      tour = this.swissTournamentService.createNewTour(tournament, dto);
    }

    if (!tour) {
      throw new UnableAddTourException('Не удалось создать тур. Что-то пошло не так');
    }

    tournament.tours.push(tour);
    await tournament.save();

    return tour;
  }

  /**
   * Удаляет тур из турнира
   */
  public async removeTour(tournament: Tournament, tour: Tour | number) {
    checkStatus(tournament, [ETournamentStatus.ACTIVE], new UnableRemoveTourException());

    if (typeof tour === 'number') {
      tour = await this.tourRepository.findById(tour);
    }

    await tour.remove();
  }
}

export default ToursService;
