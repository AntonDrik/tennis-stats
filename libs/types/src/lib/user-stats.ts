import { TPlayOffStage } from './tour';

interface IUserCommonStats {
  winPercent: number;
  allTournamentsCount: number;
  playedTournamentsCount: number;
  playedMatchesCount: number;
  playedPlayoffsCount: Record<TPlayOffStage, number>;
}

export { IUserCommonStats };
