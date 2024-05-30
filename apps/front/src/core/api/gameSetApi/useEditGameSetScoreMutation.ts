import { GameSetScoreDto } from '@tennis-stats/dto';
import { IGameSet } from '@tennis-stats/types';
import { useMutation, useQueryClient } from 'react-query';
import axiosFetcher from '../axios/fetcher';
import { ITourPageState } from '../../../pages/tour/TourPage.state';


function useEditGameSetScoreMutation(tourState: ITourPageState) {

  const { selectedMatch, selectedGameSet } = tourState;
  const queryClient = useQueryClient();

  return useMutation(
    ['edit-game-set-score'],
    (dto: GameSetScoreDto) => {
      return axiosFetcher.put<IGameSet, GameSetScoreDto>(
        `/match/${selectedMatch?.id}/game-set/${selectedGameSet?.id}/edit-score`,
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

export default useEditGameSetScoreMutation;
