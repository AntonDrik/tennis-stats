import { IdDto } from '@tennis-stats/dto';
import { useMutation, useQueryClient } from 'react-query';
import axiosFetcher from '../axios/fetcher';

function useLeaveTournamentMutation(tournamentId: number | undefined) {
  const queryClient = useQueryClient();

  return useMutation(
    ['leave-tournament'],
    (dto: IdDto) => {
      return axiosFetcher.post<void, IdDto>(`/tournaments/${tournamentId}/leave`, dto);
    },
    {
      onSuccess: () => {
        void queryClient.invalidateQueries({
          queryKey: 'get-tournament',
        });
      },
    }
  );
}

export default useLeaveTournamentMutation;
