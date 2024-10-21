import { Injectable } from '@nestjs/common';
import { CreatePlayoffDto } from '@tennis-stats/dto';
import { User } from '@tennis-stats/entities';
import { allSynchronously, getPlayoffStageInfo } from '@tennis-stats/helpers';
import { ETournamentStatus, ETourType, TPlayOffStage } from '@tennis-stats/types';
import { MatchService } from '../../match';
import { PairsGeneratorService } from '../../pairs-generator';
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
    private toursRepository: ToursRepository,
    private pairsGeneratorService: PairsGeneratorService
  ) {}

  async createPlayoff(dto: CreatePlayoffDto) {
    const activeUsers = await this.usersService.getUsersForPlayoff(dto);

    const tournament = await this.tournamentRepository.findByStatus(
      [ETournamentStatus.ACTIVE],
      'Не найден турнир с активным статусом'
    );

    const nextRounds = getPlayoffStageInfo(dto.stage).nextRounds;

    const firstTour = await this.createFirstTour(activeUsers, dto);
    const restTours = await this.createRestTours(dto.setsCount, nextRounds);

    tournament.tours.push(firstTour, ...restTours);
    tournament.status = ETournamentStatus.PLAYOFF;
    await tournament.save();

    return tournament;
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

  private async createFirstTour(activeUsers: User[], dto: CreatePlayoffDto) {
    const pairs = this.pairsGeneratorService.generateFirstWithLast(activeUsers);
    const matches = await this.matchService.createMatches(pairs, dto.setsCount, true);

    return this.toursRepository.createPlayOffTourEntity(
      dto.setsCount,
      dto.stage,
      matches
    );
  }

  private createRestTours(setsCount: number, restStages: TPlayOffStage[]) {
    return allSynchronously(
      restStages.map((stage) => async () => {
        const matches = await this.matchService.createMatchesForPlayoffStage(
          stage,
          setsCount
        );

        return this.toursRepository.createPlayOffTourEntity(setsCount, stage, matches);
      })
    );
  }
}

export default PlayoffService;
