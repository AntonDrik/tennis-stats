import { IGameSet } from './game-set';
import { IRatingHistory } from './rating-history';
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
  endDate: Date;
  number: number;
  gameSets: IGameSet[];
  isPlayoff: boolean;
  ratingHistory?: IRatingHistory[];

  // computed
  totalScore: IMatchScore;
  isFinished: boolean;
}

type TMatchRatingDelta = {
  [key in string]: { userName: string; delta: string }[];
};

export { IMatch, IMatchScore, TMatchRatingDelta };
