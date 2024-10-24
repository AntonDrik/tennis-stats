import { Injectable } from '@nestjs/common';
import { Match, Tournament } from '@tennis-stats/entities';
import { mapToArray } from '@tennis-stats/helpers';
import { ILeaderboard, ILeaderboardItem, IScoreDiff } from '@tennis-stats/types';
import { EntityManager } from 'typeorm';
import { LeaderboardItem } from '../helpers/LeaderboardItem';
import LeaderboardRepository from '../repository/leaderboard.repository';

@Injectable()
class LeaderboardService {
  constructor(private repository: LeaderboardRepository) {}

  public getLeaderboard(tournament: Tournament): ILeaderboard {
    const matches = this.getValidTournamentMatches(tournament);

    const tourMatches = matches.filter((match) => !match.isPlayoff);
    const playoffMatches = matches.filter((match) => match.isPlayoff);

    return {
      toursLeaderboard: this.composeTable(tourMatches),
      playoffLeaderboard: this.composeTable(playoffMatches),
    };
  }

  public async saveLeaderboard(tournament: Tournament, manager: EntityManager) {
    const { playoffLeaderboard } = this.getLeaderboard(tournament);

    if (!playoffLeaderboard.length) {
      return;
    }

    const entities = playoffLeaderboard.slice(0, 3).map((item, index) => {
      return this.repository.createEntity(tournament, item, index + 1);
    });

    await manager.save(entities);
  }

  private composeTable(matches: Match[]) {
    const collection = new Map<number, LeaderboardItem>();

    matches.forEach((match) => {
      this.setPointsForUser(match, 'user1', collection);
      this.setPointsForUser(match, 'user2', collection);
    });

    return mapToArray(collection)
      .map((item) => item.getData())
      .filter(Boolean)
      .sort(byTotalAndRating);
  }

  private getValidTournamentMatches(tournament: Tournament): Match[] {
    return tournament.tours
      .flatMap((tour) => tour.matches.flatMap((match) => match))
      .filter((match) => match.user1 && match.user2);
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
      const points = new LeaderboardItem(user, {
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

    const diff = gameSets.reduce((acc, curr) => {
      acc.user1 += curr.player1.score - curr.player2.score;
      acc.user2 += curr.player2.score - curr.player1.score;

      return acc;
    }, result);

    return diff[userKey];
  }
}

export default LeaderboardService;

// Окончательная сортировка списка
function byTotalAndRating(a: ILeaderboardItem, b: ILeaderboardItem) {
  return (
    b.wins - a.wins ||
    b.total - a.total ||
    b.user.rating - a.user.rating ||
    b.user.nickname.localeCompare(a.user.nickname)
  );
}
