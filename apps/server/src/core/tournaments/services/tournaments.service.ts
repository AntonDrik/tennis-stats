import { Injectable } from '@nestjs/common';
import { UpsertTournamentDto, GetTournamentsQuery } from '@tennis-stats/dto';
import { Tournament } from '@tennis-stats/entities';
import { HasUnfinishedTournamentException } from '../../../common/exceptions';
import TournamentsRepository from '../repositories/tournaments.repository';

@Injectable()
class TournamentsService {
  constructor(private repository: TournamentsRepository) {}

  public getTournamentsList(query: GetTournamentsQuery) {
    return this.repository.findTournamentsByQuery(query);
  }

  public getTournament(id: number) {
    return this.repository.findById(id);
  }

  public async createTournament(dto: UpsertTournamentDto): Promise<Tournament> {
    const lastTournament = await this.repository.findLast();

    if (lastTournament?.isUnfinished) {
      throw new HasUnfinishedTournamentException();
    }

    const tourEntity = this.repository.createEntity(dto);
    await tourEntity.save();

    return tourEntity;
  }

  public async deleteTournament(id: number): Promise<void> {
    const tournament = await this.repository.findById(id);

    await tournament.remove();
  }
}

export default TournamentsService;
