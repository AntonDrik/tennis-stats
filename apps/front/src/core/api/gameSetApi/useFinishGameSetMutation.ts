import { FinishGameSetDto } from '@tennis-stats/dto';
import { IGameSet } from '@tennis-stats/types';
import { useMutation, useQueryClient } from 'react-query';
import axiosFetcher from '../axios/fetcher';
import { ITourPageState } from '../../../pages/tour/TourPage.state';


function useFinishGameSetMutation(tourState: ITourPageState) {

  const { selectedMatch, selectedGameSet } = tourState;
  const queryClient = useQueryClient();

  return useMutation(
    ['finish-game-set'],
    (dto: FinishGameSetDto) => {
      return axiosFetcher.post<IGameSet, FinishGameSetDto>(
        `/match/${selectedMatch?.id}/game-set/${selectedGameSet?.id}/finish`,
        dto
      );
    },
    {
      onSuccess: () => {
        void queryClient.invalidateQueries({ queryKey: 'get-tour' });
      }
    }
  );
}

export default useFinishGameSetMutation;