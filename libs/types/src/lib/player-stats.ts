import { IMatch } from './match';
import { IStatsDictionary } from './stats-dictionary';
import { IUser } from './user';

interface IPlayerStat {
  id: number;
  match: IMatch;
  user: IUser;
  stat: IStatsDictionary;
  count: number;
}

export { IPlayerStat };
