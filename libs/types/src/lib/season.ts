import { IUser } from './user';

enum ESeasonStatus {
  FINISHED = 'FINISHED',
  ACTIVE = 'ACTIVE',
}

interface ISeason {
  id: number;
  startDate: Date;
  endDate: Date;
  status: ESeasonStatus;
}

interface ISeasonUserStat {
  user: IUser;

  tournamentsCount: number;
  matchesCount: number;
  matchWinCount: number;
}

interface ISeasonStats {
  tournamentsCount: number;
  usersData: ISeasonUserStat[];
}

interface ISeasonLeaderboard {
  place: number;
  user: IUser;
}

interface ISeasonWithStats extends ISeason {
  stats: ISeasonStats;
  leaderboard: ISeasonLeaderboard[];
}

export {
  ISeason,
  ESeasonStatus,
  ISeasonUserStat,
  ISeasonStats,
  ISeasonWithStats,
  ISeasonLeaderboard,
};
