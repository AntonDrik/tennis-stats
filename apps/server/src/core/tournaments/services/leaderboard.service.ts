import { Injectable } from '@nestjs/common';
import { Match, Tournament } from '@tennis-stats/entities';
import { mapToArray } from '@tennis-stats/helpers';
import { ILeaderboardItem, IScoreDiff } from '@tennis-stats/types';
import { EntityManager } from 'typeorm';
import { LeaderboardItem } from '../helpers/LeaderboardItem';
import TournamentsRepository from '../repositories/tournaments.repository';

@Injectable()
class LeaderboardService {
  constructor(private repository: TournamentsRepository) {}

  public getLeaderboard(tournament: Tournament): ILeaderboardItem[] {
    const collection = new Map<number, LeaderboardItem>();
    const matches = this.getTournamentMatches(tournament);

    matches.forEach((match) => {
      this.setPointsForUser(match, 'user1', collection);
      this.setPointsForUser(match, 'user2', collection);
    });

    return mapToArray(collection)
      .map((item) => item.getData(tournament.registeredUsers))
      .filter(Boolean)
      .sort(byTotalAndRating);
  }

  public async saveLeaderboard(tournament: Tournament, manager: EntityManager) {
    const leaderboard = this.getLeaderboard(tournament).slice(0, 5);

    const entities = leaderboard.map((item, index) => {
      return this.repository.createLeaderboardEntity(tournament, item, index + 1);
    });

    await manager.save(entities);
  }

  private getTournamentMatches(tournament: Tournament): Match[] {
    const matches = tournament.tours.flatMap((tour) =>
      tour.matches.flatMap((match) => match)
    );

    const hasPlayoff = matches.some((match) => match.isPlayoff);

    if (hasPlayoff) {
      return matches.filter((match) => match.isPlayoff && match.user1 && match.user2);
    }

    return matches.filter((match) => match.user1 && match.user2);
  }

  private setPointsForUser(
    match: Match,
    userKey: 'user1' | 'user2',
    collection: Map<number, LeaderboardItem>
  ): void {
    const user = match[userKey];
    const points = collection.get(user.id);

    const matchScoreDiff = this.calculateScoreDiff(match, userKey);

    if (!points) {
      const points = new LeaderboardItem(user.id, {
        games: Number(match.isFinished),
        scoreDiff: matchScoreDiff,
        wins: match.isWinner(user) ? 1 : 0,
      });

      collection.set(user.id, points);

      return;
    }

    if (match.isFinished) {
      points.increaseGames();
    }

    if (match.isWinner(user)) {
      points.increaseWin();
    }

    points.increaseScoreDiff(matchScoreDiff);
  }

  private calculateScoreDiff(match: Match, userKey: 'user1' | 'user2'): number {
    const gameSets = match.gameSets ?? [];
    const result: IScoreDiff = { user1: 0, user2: 0 };

    return gameSets.reduce((acc, curr) => {
      acc.user1 += curr.player1.score - curr.player2.score;
      acc.user2 += curr.player2.score - curr.player1.score;

      return acc;
    }, result)[userKey];
  }
}

export default LeaderboardService;

function byTotalAndRating(a: ILeaderboardItem, b: ILeaderboardItem) {
  return b.total - a.total || b.user.rating - a.user.rating;
}
