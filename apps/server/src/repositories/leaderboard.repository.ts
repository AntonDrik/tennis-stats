import { Injectable } from '@nestjs/common';
import { Tournament, TournamentLeaderboard, User } from '@tennis-stats/entities';
import { ILeaderboardItem } from '@tennis-stats/types';
import { DataSource, Repository } from 'typeorm';

@Injectable()
class LeaderboardRepository extends Repository<TournamentLeaderboard> {
  constructor(dataSource: DataSource) {
    super(TournamentLeaderboard, dataSource.createEntityManager());
  }

  public createEntity(tournament: Tournament, item: ILeaderboardItem, place: number) {
    const leaderboardItem = new TournamentLeaderboard();

    leaderboardItem.tournament = tournament;
    leaderboardItem.user = item.user as User;
    leaderboardItem.place = place;

    return leaderboardItem;
  }

  public executeQuery<T>(query: string): Promise<T[]> {
    return this.query(query);
  }
}

export default LeaderboardRepository;
