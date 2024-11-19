import { Injectable } from '@nestjs/common';
import { CreateTourDto, StartTournamentDto } from '@tennis-stats/dto';
import { ETournamentType } from '@tennis-stats/types';
import { ITournamentSystem } from '../interfaces/tournament-system.interface';
import { Tournament, Tour } from '@tennis-stats/entities';

@Injectable()
class SwissSystemService implements ITournamentSystem {
  initialize(tournament: Tournament, dto: StartTournamentDto): Promise<Tournament> {
    tournament.type = ETournamentType.SWISS_SYSTEM;

    return Promise.resolve(tournament);
  }

  createNewTour(tournament: Tournament, dto: CreateTourDto): Promise<Tour> {
    throw new Error('Method not implemented.');
  }
}

export default SwissSystemService;
