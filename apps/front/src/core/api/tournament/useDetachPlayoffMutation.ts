import { useMutation, useQueryClient } from 'react-query';
import axiosFetcher from '../axios/fetcher';

function useDetachPlayoffMutation(tournamentId: number | undefined) {
  const queryClient = useQueryClient();

  return useMutation(
    ['detach-tournament-playoff'],
    () => axiosFetcher.delete(`/tournaments/${tournamentId}/detach-playoff`),
    {
      onSuccess: () => {
        void queryClient.invalidateQueries({ queryKey: 'get-tournament' });
      },
    }
  );
}

export default useDetachPlayoffMutation;
