import { ITour } from './tour';
import { IUser } from './user';

enum ETournamentStatus {
  REGISTRATION = 'REGISTRATION',
  ACTIVE = 'ACTIVE',
  PLAYOFF = 'PLAYOFF',
  FINISHED = 'FINISHED',
  CANCELLED = 'CANCELLED',
}

interface ITournament {
  id: number;
  date: Date;
  status: ETournamentStatus;
  playersCount: number;
  tours: ITour[];
  registeredUsers: IUser[];
}

export { ITournament, ETournamentStatus };
