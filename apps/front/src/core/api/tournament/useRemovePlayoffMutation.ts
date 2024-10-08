import { useMutation, useQueryClient } from 'react-query';
import axiosFetcher from '../axios/fetcher';

function useRemovePlayoffMutation() {
  const queryClient = useQueryClient();

  return useMutation(
    ['remove-tournament-playoff'],
    () => axiosFetcher.delete('/tournaments/opened/remove-playoff'),
    {
      onSuccess: () => {
        void queryClient.invalidateQueries({ queryKey: 'get-tournament' });
      },
    }
  );
}

export default useRemovePlayoffMutation;
