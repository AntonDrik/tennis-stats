import { Injectable } from '@nestjs/common';
import { UpsertTournamentDto, GetTournamentsQuery } from '@tennis-stats/dto';
import { Tournament } from '@tennis-stats/entities';
import { ETournamentStatus } from '@tennis-stats/types';
import { DataSource } from 'typeorm';
import { BaseRepository } from '../common/utils';

@Injectable()
class TournamentsRepository extends BaseRepository<Tournament> {
  constructor(dataSource: DataSource) {
    super(Tournament, dataSource);
  }

  public findTournamentsByQuery(query: GetTournamentsQuery): Promise<Tournament[]> {
    const builder = this.createQueryBuilder('tournament').leftJoinAndSelect(
      'tournament.season',
      'season'
    );

    const whereFn = this.createWhereFn(builder);

    if (query.withMatches || Number.isFinite(query.userId)) {
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

    if (query.withJoinedUsers || Number.isFinite(query.registeredUserId)) {
      builder.leftJoinAndSelect('tournament.registeredUsers', 'registeredUsers');
    }

    if (query.withLeaderboard) {
      builder
        .leftJoinAndSelect('tournament.leaderboard', 'leaderboard')
        .leftJoinAndSelect('leaderboard.user', 'leaderboardUser');
    }

    if (Number.isFinite(query.id)) {
      whereFn('tournament.id = :id', { id: query.id });
    }

    if (query.sortByDate) {
      builder.orderBy('tournament.date', 'DESC');
    }

    if (query.status) {
      whereFn('tournament.status IN(:...status)', { status: query.status });
    }

    if (Number.isFinite(query.seasonId)) {
      whereFn('season.id = :seasonId', { seasonId: query.seasonId });
    }

    if (Number.isFinite(query.userId)) {
      whereFn('matchUser1.id = :userId OR matchUser2.id = :userId', { userId: query.userId });
    }

    if (Number.isFinite(query.registeredUserId)) {
      whereFn('registeredUsers.id = :userId', { userId: query.registeredUserId });
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
