import { IMatch } from './match';
import { IUser } from './user';

interface IRatingHistory {
  id: number;
  rating: number;
  date: Date;
  user?: IUser;
  match?: IMatch;
}

interface IAvgRatingByDay {
  formattedDate: string;
  rating: number;
  userId: number;
  userFirstName: string;
  userLastName: string;
  userColor: string;
}

interface IRawUserRatingHistoryItem {
  id: number;
  rating: number;
  date: Date;
  tournamentID: number;
}

interface IRawMinMaxUserRating {
  min: number;
  max: number;
}

interface IRawUserRatingHistory {
  list: IRawUserRatingHistoryItem[];
  minMaxRawData: IRawMinMaxUserRating;
}

export {
  IRatingHistory,
  IRawUserRatingHistory,
  IRawMinMaxUserRating,
  IRawUserRatingHistoryItem,
  IAvgRatingByDay,
};
