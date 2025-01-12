import { Injectable } from '@nestjs/common';
import { UpsertTournamentDto, GetTournamentsQuery } from '@tennis-stats/dto';
import { Tournament } from '@tennis-stats/entities';
import { ETournamentStatus } from '@tennis-stats/types';
import { DataSource, Repository } from 'typeorm';

@Injectable()
class TournamentsRepository extends Repository<Tournament> {
  constructor(dataSource: DataSource) {
    super(Tournament, dataSource.createEntityManager());
  }

  public findTournamentsByQuery(query: GetTournamentsQuery): Promise<Tournament[]> {
    const builder = this.createQueryBuilder('tournament').leftJoinAndSelect(
      'tournament.registeredUsers',
      'registeredUsers'
    );

    if (query.withMatches) {
      builder
        .leftJoinAndSelect('tournament.tours', 'tours')
        .leftJoinAndSelect('tours.matches', 'matches')
        .leftJoinAndSelect('matches.user1', 'matchUser1')
        .leftJoinAndSelect('matches.user2', 'matchUser2')
        .leftJoinAndSelect('matches.gameSets', 'gameSets')
        .leftJoinAndSelect('gameSets.player1', 'player1')
        .leftJoinAndSelect('gameSets.player2', 'player2')
        .leftJoinAndSelect('player1.user', 'user1')
        .leftJoinAndSelect('player2.user', 'user2');
    }

    if (query.withLeaderboard) {
      builder
        .leftJoinAndSelect('tournament.leaderboard', 'leaderboard')
        .leftJoinAndSelect('leaderboard.user', 'leaderboardUser');
    }

    if (Number.isFinite(query.id)) {
      builder.where('tournament.id = :id', { id: query.id });
    }

    if (query.sortByDate) {
      builder.orderBy('tournament.date', 'DESC');
    }

    if (query.status) {
      builder.where('tournament.status IN(:...status)', { status: query.status });
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
}

export default TournamentsRepository;
