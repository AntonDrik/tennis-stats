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
  formattedDate: string,
  rating: number,
  userId: number,
  userFirstName: string,
  userLastName: string,
  userColor: string
}

export {
  IRatingHistory,
  IAvgRatingByDay
};
