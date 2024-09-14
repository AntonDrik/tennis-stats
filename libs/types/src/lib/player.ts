import { IUser } from './user';


type TScore = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20

type TScoreCaption = `${TScore} | ${TScore}`

interface IPlayer {
  id: number;
  user: IUser;
  score: TScore;
  isWinner: boolean;
}

export { IPlayer, TScore, TScoreCaption };
