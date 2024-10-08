import { useMutation, useQueryClient } from 'react-query';
import { ITournamentState } from '../../store';
import axiosFetcher from '../axios/fetcher';

function useRemoveMatchMutation(tournamentState: ITournamentState) {
  const tournamentId = tournamentState.selectedTournament?.id;
  const tourId = tournamentState.selectedTour?.id;
  const matchId = tournamentState.selectedMatch?.id;

  const queryClient = useQueryClient();

  return useMutation(
    'remove-match',
    () =>
      axiosFetcher.delete(
        `/tournaments/${tournamentId}/tours/${tourId}/match/${matchId}`
      ),
    {
      onSuccess: () => {
        void queryClient.invalidateQueries({ queryKey: 'get-tournament' });
      },
    }
  );
}

export default useRemoveMatchMutation;
