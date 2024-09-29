import { UpsertTournamentDto } from '@tennis-stats/dto';
import { ITournament } from '@tennis-stats/types';
import { useMutation, useQueryClient } from 'react-query';
import axiosFetcher from '../axios/fetcher';

function useUpdateTournamentMutation() {
  const queryClient = useQueryClient();

  return useMutation(
    ['update-tournament'],
    (dto: UpsertTournamentDto) =>
      axiosFetcher.put<ITournament, UpsertTournamentDto>(
        '/tournaments/opened/update',
        dto
      ),
    {
      onSuccess: () => {
        void queryClient.invalidateQueries({ queryKey: 'get-tournaments' });
      },
    }
  );
}

export default useUpdateTournamentMutation;
