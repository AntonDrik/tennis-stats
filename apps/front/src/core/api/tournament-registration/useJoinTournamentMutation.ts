import { TournamentRegistrationDto } from '@tennis-stats/dto';
import { useMutation, useQueryClient } from 'react-query';
import axiosFetcher from '../axios/fetcher';

function useJoinTournamentMutation(tournamentId: number | undefined) {
  const queryClient = useQueryClient();

  return useMutation(
    ['join-tournament'],
    (dto: Omit<TournamentRegistrationDto, 'validate'>) => {
      return axiosFetcher.post<void, Omit<TournamentRegistrationDto, 'validate'>>(
        `/tournaments/${tournamentId}/join`,
        dto
      );
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

export default useJoinTournamentMutation;
