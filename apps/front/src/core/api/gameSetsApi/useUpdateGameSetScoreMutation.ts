import { UpdateGameSetScoreDto } from '@tennis-stats/dto';
import { IGameSet } from '@tennis-stats/types';
import { useMutation, useQueryClient } from 'react-query';
import axiosFetcher from '../axios/fetcher';
import { ITourPageState } from '../../../pages/tour/TourPage.state';


function useUpdateGameSetScoreMutation(tourState: ITourPageState, invalidateTour = false) {

  const { selectedMatch, selectedGameSet } = tourState;
  const queryClient = useQueryClient();

  return useMutation(
    ['update-game-set-score'],
    (dto: UpdateGameSetScoreDto) => {
      return axiosFetcher.put<IGameSet, UpdateGameSetScoreDto>(
        `/match/${selectedMatch?.id}/game-set/${selectedGameSet?.id}/update-score`,
        dto
      );
    },
    {
      onSuccess: () => {
        if (invalidateTour) {
          void queryClient.invalidateQueries({ queryKey: 'get-tour' });
        }
      }
    }
  );
}

export default useUpdateGameSetScoreMutation;
