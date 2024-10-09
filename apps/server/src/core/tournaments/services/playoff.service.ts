import { Injectable } from '@nestjs/common';
import { CreatePlayoffDto } from '@tennis-stats/dto';
import { User } from '@tennis-stats/entities';
import { allSynchronously, getRoundInfo } from '@tennis-stats/helpers';
import {
  ETourGenerator,
  ETournamentStatus,
  ETourType,
  TPlayOffRound,
} from '@tennis-stats/types';
import { InvalidPlayoffTypeException } from '../../../common/exceptions/playoff.exceptions';
import { MatchService } from '../../match';
import ToursRepository from '../../tours/repository/tours.repository';
import { UsersService } from '../../users';
import TournamentsRepository from '../repositories/tournaments.repository';
import OpenedTournamentService from './opened-tournament.service';

@Injectable()
class PlayoffService {
  constructor(
    private matchService: MatchService,
    private usersService: UsersService,
    private tournamentRepository: TournamentsRepository,
    private openedTournamentService: OpenedTournamentService,
    private toursRepository: ToursRepository
  ) {}

  async createPlayoff(dto: CreatePlayoffDto) {
    const activeUsers = await this.usersService.getUsersForPlayoff(dto);
    const tournament = await this.tournamentRepository.findByStatus(
      [ETournamentStatus.ACTIVE],
      'Не найден турнир с активным статусом'
    );

    if (!dto.round) {
      throw new InvalidPlayoffTypeException();
    }

    const nextRounds = getRoundInfo(dto.round).nextRounds;

    const firstTour = await this.createFirstTour(activeUsers, dto.setsCount, dto.round);

    const restTours = await this.createRestTours(dto.setsCount, nextRounds);

    tournament.tours.push(firstTour, ...restTours);
    tournament.status = ETournamentStatus.PLAYOFF;

    await tournament.save();
  }

  async removePlayoff() {
    const tournament = await this.tournamentRepository.findByStatus(
      [ETournamentStatus.PLAYOFF],
      'Турнир с активным плейофф не найден'
    );

    tournament.status = ETournamentStatus.ACTIVE;
    tournament.tours = tournament.tours.filter((tour) => tour.type === ETourType.SIMPLE);

    await tournament.save();
  }

  private async createFirstTour(
    activeUsers: User[],
    setsCount: number,
    stage: TPlayOffRound
  ) {
    const matches = await this.matchService.createMatches(
      activeUsers,
      {
        setsCount,
        pairsGenerator: ETourGenerator.RANDOM,
      },
      true
    );

    return this.toursRepository.createPlayOffTourEntity(setsCount, stage, matches);
  }

  private createRestTours(setsCount: number, restRounds: TPlayOffRound[]) {
    return allSynchronously(
      restRounds.map((round) => async () => {
        const matches = await this.matchService.createMatchesForPlayoffRound(
          round,
          setsCount
        );

        return this.toursRepository.createPlayOffTourEntity(setsCount, round, matches);
      })
    );
  }
}

export default PlayoffService;
