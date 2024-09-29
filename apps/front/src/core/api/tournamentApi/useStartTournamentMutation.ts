import { StartTournamentDto } from '@tennis-stats/dto';
import { ITournament } from '@tennis-stats/types';
import { useMutation, useQueryClient } from 'react-query';
import axiosFetcher from '../axios/fetcher';

function useStartTournamentMutation() {
  const queryClient = useQueryClient();

  return useMutation(
    ['start-tournament'],
    (dto: StartTournamentDto) =>
      axiosFetcher.post<ITournament, StartTournamentDto>(
        '/tournaments/opened/start',
        dto
      ),
    {
      onSuccess: () => {
        void queryClient.invalidateQueries({ queryKey: 'get-tournaments' });
      },
    }
  );
}

export default useStartTournamentMutation;
