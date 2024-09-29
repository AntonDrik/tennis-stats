import { IMatch } from './match';
import { IPlayer } from './player';

interface IGameSet {
  id: number;
  match: IMatch;
  // Номер сета
  number: number;
  player1: IPlayer;
  player2: IPlayer;
  startDate: Date | null;
  endDate: Date;
  isFinished: boolean;
}

export { IGameSet };
