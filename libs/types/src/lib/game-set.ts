import { IMatch } from './match';
import { IPlayer } from './player';

interface IGameSet {
  id: number;
  match: IMatch;
  // Номер сета
  number: number;
  player1: IPlayer;
  player2: IPlayer;
  isFinished: boolean;
}

export { IGameSet };
