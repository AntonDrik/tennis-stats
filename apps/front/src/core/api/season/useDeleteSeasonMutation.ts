import { useMutation, useQueryClient } from 'react-query';
import axiosFetcher from '../axios/fetcher';

function useDeleteSeasonMutation() {
  const queryClient = useQueryClient();

  return useMutation(
    ['delete-season'],
    (id: number) => axiosFetcher.delete<void>(`/seasons/${id}`),
    {
      onSuccess: () => {
        void queryClient.invalidateQueries({ queryKey: 'get-seasons' });
      },
    }
  );
}

export default useDeleteSeasonMutation;
