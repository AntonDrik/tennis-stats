import { IUser } from './user';

export interface IInitialPoints {
  games: number;
  scoreDiff: number;
  wins: number;
}

export interface IScoreDiff {
  user1: number;
  user2: number;
}

export interface ILeaderboardItem {
  user: IUser;
  games: number;
  scoreDiff: number;
  wins: number;
  total: number;
}

export interface ILeaderboard {
  toursLeaderboard: ILeaderboardItem[];
  playoffLeaderboard: ILeaderboardItem[];
}
