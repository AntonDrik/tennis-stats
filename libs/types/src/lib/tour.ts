import { IMatch } from './match';

enum ETourType {
  SIMPLE = 'SIMPLE',
  PLAY_OFF = 'PLAY_OFF',
}

type TPlayOffStage = '1/64' | '1/32' | '1/16' | '1/8' | '1/4' | '1/2' | '1/1';

interface ITour {
  id: number;
  matches: IMatch[];
  type: ETourType;
  number?: number;
  playOffStage?: TPlayOffStage;
}

export { ITour, TPlayOffStage, ETourType };
