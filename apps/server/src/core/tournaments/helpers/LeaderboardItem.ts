import { User } from '@tennis-stats/entities';
import { IInitialPoints, ILeaderboardItem } from '@tennis-stats/types';

export class LeaderboardItem {
  private readonly _userId: number;
  private _games = 0;
  private _scoreDiff = 0;
  private _wins = 0;

  constructor(userId: number, points: IInitialPoints) {
    this._userId = userId;
    this._games = points.games;
    this._scoreDiff = points.scoreDiff;
    this._wins = points.wins;
  }

  getData(userEntities: User[]): ILeaderboardItem | null {
    const user = userEntities.find((user) => user.id === this._userId) ?? null;

    if (!user) {
      return null;
    }

    return {
      user,
      games: this._games,
      scoreDiff: this._scoreDiff,
      wins: this._wins,
      total: this._scoreDiff + this._wins,
    };
  }

  increaseGames() {
    this._games += 1;
  }

  increaseWin() {
    this._wins += 1;
  }

  increaseScoreDiff(diff: number) {
    this._scoreDiff += diff;
  }
}
