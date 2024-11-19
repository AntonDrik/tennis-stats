import { IMatch } from './match';

enum ETourType {
  SIMPLE = 'SIMPLE',
  PLAY_OFF = 'PLAY_OFF',
}

enum ETourGenerator {
  RANDOM = 'RANDOM',
  BY_RATING = 'BY_RATING',
  BY_LEADERBOARD = 'BY_LEADERBOARD',
}

type TPlayOffStage = '1/64' | '1/32' | '1/16' | '1/8' | '1/4' | '1/2' | '1/1';

interface ITour {
  id: number;
  matches: IMatch[];
  type: ETourType;
  number?: number;
  playOffStage?: TPlayOffStage;
}

export { ITour, ETourGenerator, TPlayOffStage, ETourType };
