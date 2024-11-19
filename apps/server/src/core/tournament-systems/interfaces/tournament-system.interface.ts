import { CreateTourDto, StartTournamentDto } from '@tennis-stats/dto';
import { Tour, Tournament } from '@tennis-stats/entities';

export interface ITournamentSystem {
  initialize(tournament: Tournament, dto: StartTournamentDto): Promise<Tournament>;

  createNewTour(tournament: Tournament, dto: CreateTourDto): Promise<Tour>;
}
