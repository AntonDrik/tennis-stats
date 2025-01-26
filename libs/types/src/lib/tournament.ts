import { ISeason } from './season';
import { ITour } from './tour';
import { ITournamentLeaderboard } from './tournament-leaderboard';
import { IUser } from './user';

enum ETournamentStatus {
  REGISTRATION = 'REGISTRATION',
  ACTIVE = 'ACTIVE',
  FINISHED = 'FINISHED',
}

enum ETournamentType {
  ROUND_ROBIN = 'ROUND_ROBIN',
  SWISS_SYSTEM = 'SWISS_SYSTEM',
  PLAYOFF = 'PLAYOFF',
}

interface ITournament {
  id: number;
  date: Date;
  type: ETournamentType;
  status: ETournamentStatus;
  season: ISeason | null;
  leaderboard: ITournamentLeaderboard[];
  playersCount: number;
  tours: ITour[];
  registeredUsers: IUser[];
  handleRating: boolean;
  seasonFinal: boolean;
}

export { ITournament, ETournamentStatus, ETournamentType };
