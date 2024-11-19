import { Injectable } from '@nestjs/common';
import { CreateTourDto, StartTournamentDto } from '@tennis-stats/dto';
import { Tour, Tournament } from '@tennis-stats/entities';
import { ETournamentType } from '@tennis-stats/types';
import RoundRobinSystemService from './round-robin-system.service';
import SwissSystemService from './swiss-system.service';

@Injectable()
class TournamentSystemsFacade {
  constructor(
    private roundRobinSystemService: RoundRobinSystemService,
    private swissSystemService: SwissSystemService
  ) {}

  public initialize(
    tournament: Tournament,
    dto: StartTournamentDto
  ): Promise<Tournament> {
    switch (dto.tournamentType) {
      case ETournamentType.ROUND_ROBIN:
        return this.roundRobinSystemService.initialize(tournament, dto);

      case ETournamentType.SWISS_SYSTEM:
      default:
        return this.swissSystemService.initialize(tournament, dto);
    }
  }

  public createNewTour(tournament: Tournament, dto: CreateTourDto): Promise<Tour> {
    switch (tournament.type) {
      case ETournamentType.ROUND_ROBIN:
        return this.roundRobinSystemService.createNewTour(tournament, dto);

      case ETournamentType.SWISS_SYSTEM:
      default:
        return this.swissSystemService.createNewTour(tournament, dto);
    }
  }
}

export default TournamentSystemsFacade;
