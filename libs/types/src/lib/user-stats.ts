import { IMatch } from './match';
import { TPlayOffStage } from './tour';
import { ITournament } from './tournament';
import { IUser } from './user';

type TPlayedPlayoffsStats = Record<TPlayOffStage, number>;

type TPlacesStats = Record<number, number>;

interface IExtendedPairMatch extends IMatch {
  tournament: Pick<ITournament, 'id' | 'date'>;
}

interface IUserCommonStats {
  winPercent: number | null;
  allTournamentsCount: number;
  playedTournamentsCount: number;
  playedMatchesCount: number;
  playedPlayoffsCount: TPlayedPlayoffsStats | null;
  placesStats: TPlacesStats;
}

interface IUserPairStats {
  winPercent: number | null;
  playedPlayoffsCount: number;
  playedToursCount: number;
  matches: IExtendedPairMatch[];
}

interface IOpponent {
  user: IUser;
  gamesCount: number;
}

export {
  IUserCommonStats,
  IUserPairStats,
  TPlayedPlayoffsStats,
  TPlacesStats,
  IOpponent,
  IExtendedPairMatch,
};
