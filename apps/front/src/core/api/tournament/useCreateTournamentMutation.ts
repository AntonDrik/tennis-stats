import { UpsertTournamentDto } from '@tennis-stats/dto';
import { ITournament } from '@tennis-stats/types';
import { useMutation, useQueryClient } from 'react-query';
import axiosFetcher from '../axios/fetcher';

function useCreateTournamentMutation() {
  const queryClient = useQueryClient();

  return useMutation(
    ['create-tournament'],
    (dto: UpsertTournamentDto) =>
      axiosFetcher.post<ITournament, UpsertTournamentDto>(
        '/tournaments/create',
        dto
      ),
    {
      onSuccess: () => {
        void queryClient.invalidateQueries({ queryKey: 'get-tournaments' });
      },
      onError: (err) => {
        console.log(err);
      },
    }
  );
}

export default useCreateTournamentMutation;
