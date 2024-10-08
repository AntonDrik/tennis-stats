import { useMutation, useQueryClient } from 'react-query';
import { ITournamentState } from '../../store';
import axiosFetcher from '../axios/fetcher';

function useRemoveTourMutation(tournamentState: ITournamentState) {
  const { selectedTournament, selectedTour } = tournamentState;

  const queryClient = useQueryClient();

  return useMutation(
    'remove-tour',
    () =>
      axiosFetcher.delete(
        `/tournaments/${selectedTournament?.id}/tours/${selectedTour?.id}`
      ),
    {
      onSuccess: () => {
        void queryClient.invalidateQueries({ queryKey: 'get-tournament' });
      },
    }
  );
}

export default useRemoveTourMutation;
