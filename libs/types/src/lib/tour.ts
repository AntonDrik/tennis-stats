import { IMatch } from './match';

enum ETourType {
  SIMPLE = 'SIMPLE',
  PLAY_OFF = 'PLAY_OFF',
}

enum ETourGenerator {
  RANDOM = 'RANDOM',
}

type TPlayOffRound = '1/64' | '1/32' | '1/16' | '1/8' | '1/4' | '1/2' | '1/1';

interface ITour {
  id: number;
  setsCount: number;
  matches: IMatch[];
  type: ETourType;
  number?: number;
  playOffStage?: TPlayOffRound;
}

export { ITour, ETourGenerator, TPlayOffRound, ETourType };
