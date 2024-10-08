import { CreateTourDto } from '@tennis-stats/dto';
import { ITour } from '@tennis-stats/types';
import { useMutation, useQueryClient } from 'react-query';
import axiosFetcher from '../axios/fetcher';

function useAddTourMutation(tournamentId: number | undefined) {
  const queryClient = useQueryClient();

  return useMutation(
    ['add-tour'],
    (dto: CreateTourDto) =>
      axiosFetcher.post<ITour, CreateTourDto>(
        `/tournaments/${tournamentId}/tours`,
        dto
      ),
    {
      onSuccess: () => {
        void queryClient.invalidateQueries({ queryKey: 'get-tournament' });
      },
    }
  );
}

export default useAddTourMutation;
