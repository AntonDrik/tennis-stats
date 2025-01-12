import { IdDto } from '@tennis-stats/dto';
import { useMutation, useQueryClient } from 'react-query';
import { ITournamentState } from '../../store';
import axiosFetcher from '../axios/fetcher';

function useAddUserOnTournamentMutation(tournamentState: ITournamentState) {
  const tournamentId = tournamentState.selectedTournament?.id;

  const queryClient = useQueryClient();

  return useMutation(
    'add-user-on-tournament',
    (dto: IdDto) => axiosFetcher.post<void, IdDto>(`/tournaments/${tournamentId}/add-user`, dto),
    {
      onSuccess: () => {
        void queryClient.invalidateQueries({ queryKey: 'get-tournament' });
      },
    }
  );
}

export default useAddUserOnTournamentMutation;
