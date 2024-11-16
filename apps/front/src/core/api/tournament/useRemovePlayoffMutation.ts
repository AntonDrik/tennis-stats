import { useMutation, useQueryClient } from 'react-query';
import axiosFetcher from '../axios/fetcher';

function useRemovePlayoffMutation(tournamentId: number | undefined) {
  const queryClient = useQueryClient();

  return useMutation(
    ['remove-tournament-playoff'],
    () => axiosFetcher.delete(`/tournaments/${tournamentId}/remove-playoff`),
    {
      onSuccess: () => {
        void queryClient.invalidateQueries({ queryKey: 'get-tournament' });
      },
    }
  );
}

export default useRemovePlayoffMutation;
