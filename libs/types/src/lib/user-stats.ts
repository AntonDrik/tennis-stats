import { TPlayOffStage } from './tour';

type TPlayedPlayoffsStats = Record<TPlayOffStage, number>;

type TPlacesStats = Record<number, number>;

interface IUserCommonStats {
  winPercent: number;
  allTournamentsCount: number;
  playedTournamentsCount: number;
  playedMatchesCount: number;
  playedPlayoffsCount: TPlayedPlayoffsStats;
  placesStats: TPlacesStats;
}

export { IUserCommonStats, TPlayedPlayoffsStats, TPlacesStats };
