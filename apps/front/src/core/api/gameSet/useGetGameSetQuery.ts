import { IGameSet } from '@tennis-stats/types';
import { useQuery } from 'react-query';
import { ITournamentState } from '../../store';
import axiosFetcher from '../axios/fetcher';
import { TQueryOptions } from '../types';

function useGetGameSetQuery(
  tournamentState: ITournamentState,
  options?: TQueryOptions<IGameSet>
) {
  const tournamentId = tournamentState.selectedTournament?.id;
  const tourId = tournamentState.selectedTour?.id;
  const matchId = tournamentState.selectedMatch?.id;
  const gameSetId = tournamentState.selectedGameSet?.id;

  return useQuery(
    ['get-gameSet', `get-gameSet-${matchId}-${gameSetId}`],
    () =>
      axiosFetcher.get<IGameSet>(
        `/tournaments/${tournamentId}/tours/${tourId}/match/${matchId}/game-set/${gameSetId}`
      ),
    {
      refetchOnMount: true,
      ...options,
    }
  );
}

export default useGetGameSetQuery;
