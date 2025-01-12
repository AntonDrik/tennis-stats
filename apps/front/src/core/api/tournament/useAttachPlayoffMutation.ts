import { CreatePlayoffDto } from '@tennis-stats/dto';
import { useMutation, useQueryClient } from 'react-query';
import axiosFetcher from '../axios/fetcher';

function useAttachPlayoffMutation(tournamentId: number | undefined) {
  const queryClient = useQueryClient();

  return useMutation(
    ['attach-tournament-playoff'],
    (dto: CreatePlayoffDto) =>
      axiosFetcher.post<void, CreatePlayoffDto>(
        `/tournaments/${tournamentId}/attach-playoff`,
        dto
      ),
    {
      onSuccess: () => {
        void queryClient.invalidateQueries({ queryKey: 'get-tournament' });
      },
    }
  );
}

export default useAttachPlayoffMutation;
