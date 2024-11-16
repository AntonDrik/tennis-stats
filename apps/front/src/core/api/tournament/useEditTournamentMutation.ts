import { UpsertTournamentDto } from '@tennis-stats/dto';
import { ITournament } from '@tennis-stats/types';
import { useMutation, useQueryClient } from 'react-query';
import axiosFetcher from '../axios/fetcher';

function useEditTournamentMutation(tournamentId: number | undefined) {
  const queryClient = useQueryClient();

  return useMutation(
    ['edit-tournament'],
    (dto: UpsertTournamentDto) =>
      axiosFetcher.put<ITournament, UpsertTournamentDto>(
        `/tournaments/${tournamentId}/edit`,
        dto
      ),
    {
      onSuccess: () => {
        void queryClient.invalidateQueries({ queryKey: 'get-tournaments' });
      },
    }
  );
}

export default useEditTournamentMutation;
