import { IdDto } from '@tennis-stats/dto';
import { useMutation, useQueryClient } from 'react-query';
import axiosFetcher from '../axios/fetcher';

function useCancelTournamentMutation() {
  const queryClient = useQueryClient();

  return useMutation(
    'cancel-tournament',
    (dto: IdDto) => axiosFetcher.post<void, IdDto>('/tournaments/cancel', dto),
    {
      onSuccess: () => {
        void queryClient.invalidateQueries({ queryKey: 'get-tournaments' });
        void queryClient.invalidateQueries({ queryKey: 'get-tournament' });
      },
    }
  );
}

export default useCancelTournamentMutation;
