import { IGameSet } from './game-set';
import { ITour } from './tour';
import { IUser } from './user';

interface IMatchScore {
  user1: number;
  user2: number;
}

interface IMatch {
  id: number;
  tour: ITour;
  user1: IUser;
  user2: IUser;
  number: number;
  gameSets: IGameSet[];
  totalScore: IMatchScore;
}

type TMatchRatingDelta = {
  [key in string]: { userName: string; delta: string }[];
};

export { IMatch, IMatchScore, TMatchRatingDelta };
