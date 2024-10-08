import { CreatePlayoffDto } from '@tennis-stats/dto';
import { useMutation, useQueryClient } from 'react-query';
import axiosFetcher from '../axios/fetcher';

function useCreatePlayoffMutation() {
  const queryClient = useQueryClient();

  return useMutation(
    ['create-tournament-playoff'],
    (dto: CreatePlayoffDto) =>
      axiosFetcher.post<void, CreatePlayoffDto>(
        '/tournaments/opened/create-playoff',
        dto
      ),
    {
      onSuccess: () => {
        void queryClient.invalidateQueries({ queryKey: 'get-tournament' });
      },
    }
  );
}

export default useCreatePlayoffMutation;
