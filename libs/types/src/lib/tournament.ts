import { ITour } from './tour';
import { ITournamentLeaderboard } from './tournament-leaderboard';
import { IUser } from './user';

enum ETournamentStatus {
  REGISTRATION = 'REGISTRATION',
  ACTIVE = 'ACTIVE',
  PLAYOFF = 'PLAYOFF',
  FINISHED = 'FINISHED',
}

enum ETournamentType {
  ROUND_ROBIN = 'ROUND_ROBIN',
  SWISS_SYSTEM = 'SWISS_SYSTEM',
}

interface ITournament {
  id: number;
  date: Date;
  type: ETournamentType;
  status: ETournamentStatus;
  leaderboard: ITournamentLeaderboard[];
  playersCount: number;
  tours: ITour[];
  registeredUsers: IUser[];
  handleRating: boolean;
}

export { ITournament, ETournamentStatus, ETournamentType };
