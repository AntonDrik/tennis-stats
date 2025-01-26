import { useMutation, useQueryClient } from 'react-query';
import axiosFetcher from '../axios/fetcher';

function useFinishSeasonMutation() {
  const queryClient = useQueryClient();

  return useMutation(
    ['finish-season'],
    (id: number) => axiosFetcher.patch<void>(`/seasons/${id}`),
    {
      onSuccess: () => {
        void queryClient.invalidateQueries({ queryKey: 'get-seasons' });
      },
    }
  );
}

export default useFinishSeasonMutation;
