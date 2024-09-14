import { IUserAuth } from './auth';
import { IPermission } from './permissions';
import { IRatingHistory } from './rating-history';


interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  fullName: string;
  color: string;
  shortFullName: string;
  rating: number;
  permissions: IPermission[];
  ratingHistory?: IRatingHistory[];
  auth?: IUserAuth;
}

interface IUserWithRatingDiff extends IUser {
  ratingDiff: string;
}

export { IUser, IUserWithRatingDiff };
