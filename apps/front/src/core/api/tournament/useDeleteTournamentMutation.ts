import { useMutation, useQueryClient } from 'react-query';
import axiosFetcher from '../axios/fetcher';

function useDeleteTournamentMutation() {
  const queryClient = useQueryClient();

  return useMutation(
    ['delete-tournament'],
    () => axiosFetcher.delete('/tournaments/opened/delete'),
    {
      onSuccess: () => {
        void queryClient.invalidateQueries({ queryKey: 'get-tournaments' });
      },
    }
  );
}

export default useDeleteTournamentMutation;
