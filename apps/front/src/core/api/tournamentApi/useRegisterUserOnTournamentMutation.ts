import { TournamentRegistrationDto } from '@tennis-stats/dto';
import { useMutation, useQueryClient } from 'react-query';
import axiosFetcher from '../axios/fetcher';

function useRegisterUserOnTournamentMutation() {
  const queryClient = useQueryClient();

  return useMutation(
    ['tournament-user-register'],
    (dto: TournamentRegistrationDto) => {
      return axiosFetcher.post<void, TournamentRegistrationDto>(
        '/tournaments/opened/register-user',
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

export default useRegisterUserOnTournamentMutation;
