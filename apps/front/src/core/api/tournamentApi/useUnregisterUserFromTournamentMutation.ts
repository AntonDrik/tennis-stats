import { IdDto } from '@tennis-stats/dto';
import { useMutation, useQueryClient } from 'react-query';
import axiosFetcher from '../axios/fetcher';

function useUnregisterUserFromTournamentMutation() {
  const queryClient = useQueryClient();

  return useMutation(
    ['tournament-user-unregister'],
    (dto: IdDto) => {
      return axiosFetcher.post<void, IdDto>(
        '/tournaments/opened/unregister-user',
        dto
      );
    },
    {
      onSuccess: () => {
        void queryClient.invalidateQueries({
          queryKey: 'get-opened-tournament',
        });
      },
    }
  );
}

export default useUnregisterUserFromTournamentMutation;
