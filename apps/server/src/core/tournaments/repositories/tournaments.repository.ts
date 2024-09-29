import { Injectable } from '@nestjs/common';
import { UpsertTournamentDto, GetTournamentsQuery } from '@tennis-stats/dto';
import { Tournament } from '@tennis-stats/entities';
import { ETournamentStatus } from '@tennis-stats/types';
import { DataSource, Repository } from 'typeorm';
import {
  OpenedTournamentNotFoundException,
  TournamentNotFoundException,
} from '../../../common/exceptions';

@Injectable()
class TournamentsRepository extends Repository<Tournament> {
  constructor(dataSource: DataSource) {
    super(Tournament, dataSource.createEntityManager());
  }

  public async findById(id: number): Promise<Tournament> {
    const tournament = await this.findOneBy({ id });

    if (!tournament) {
      throw new TournamentNotFoundException();
    }

    return tournament;
  }

  public async findByStatus(
    status: ETournamentStatus,
    error?: string
  ): Promise<Tournament> {
    const tournaments = await this.findTournamentsByQuery({
      status,
    });

    const tournament = tournaments[0];

    if (!tournament) {
      throw new TournamentNotFoundException(error);
    }

    return tournament;
  }

  public async findLast(): Promise<Tournament | null> {
    const tournamentsList = await this.find({
      order: { id: 'DESC' },
      take: 1,
    });

    return tournamentsList?.[0];
  }

  public findTournamentsByQuery(
    query: GetTournamentsQuery
  ): Promise<Tournament[]> {
    const builder = this.createQueryBuilder('tournament')
      .leftJoinAndSelect('tournament.tours', 'tours')
      .leftJoinAndSelect('tournament.registeredUsers', 'registeredUsers')
      .leftJoinAndSelect('tours.matches', 'matches')
      .leftJoinAndSelect('matches.user1', 'matchUser1')
      .leftJoinAndSelect('matches.user2', 'matchUser2')
      .leftJoinAndSelect('matches.gameSets', 'gameSets')
      .leftJoinAndSelect('gameSets.player1', 'player1')
      .leftJoinAndSelect('gameSets.player2', 'player2')
      .leftJoinAndSelect('player1.user', 'user1')
      .leftJoinAndSelect('player2.user', 'user2');

    if (Number.isFinite(query.id)) {
      builder.where('tournament.id = :id', { id: query.id });
    }

    if (query.sortByDate) {
      builder.orderBy('tournament.date', 'DESC');
    }

    if (query.status) {
      builder.where('tournament.status = :status', { status: query.status });
    }

    return builder.getMany();
  }

  public createEntity(dto: UpsertTournamentDto): Tournament {
    const tournament = new Tournament();

    tournament.date = new Date();
    tournament.status = ETournamentStatus.REGISTRATION;
    tournament.playersCount = dto.playersCount;

    return tournament;
  }

  public executeQuery<T>(query: string): Promise<T[]> {
    return this.query(query);
  }
}

export default TournamentsRepository;
