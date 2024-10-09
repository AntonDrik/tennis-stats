import { ITour } from './tour';
import { ITournamentLeaderboard } from './tournament-leaderboard';
import { IUser } from './user';

enum ETournamentStatus {
  REGISTRATION = 'REGISTRATION',
  ACTIVE = 'ACTIVE',
  PLAYOFF = 'PLAYOFF',
  FINISHED = 'FINISHED',
}

interface ITournament {
  id: number;
  date: Date;
  status: ETournamentStatus;
  leaderboard: ITournamentLeaderboard[];
  playersCount: number;
  tours: ITour[];
  registeredUsers: IUser[];
  handleRating: boolean;
}

export { ITournament, ETournamentStatus };
