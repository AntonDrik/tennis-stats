import { ITournament } from '@tennis-stats/types';
import { useMutation, useQueryClient } from 'react-query';
import axiosFetcher from '../axios/fetcher';

function useFinishTournamentMutation(tournamentId: number) {
  const queryClient = useQueryClient();

  return useMutation(
    ['finish-tournament'],
    () => axiosFetcher.post<ITournament>(`/tournaments/${tournamentId}/finish`),
    {
      onSuccess: () => {
        void queryClient.invalidateQueries({
          queryKey: ['get-tournaments'],
        });
      },
    }
  );
}

export default useFinishTournamentMutation;
