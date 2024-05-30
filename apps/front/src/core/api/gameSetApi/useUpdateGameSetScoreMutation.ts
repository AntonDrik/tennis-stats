import { GameSetScoreDto } from '@tennis-stats/dto';
import { IGameSet } from '@tennis-stats/types';
import { useMutation } from 'react-query';
import axiosFetcher from '../axios/fetcher';
import { ITourPageState } from '../../../pages/tour/TourPage.state';


function useUpdateGameSetScoreMutation(tourState: ITourPageState) {

  const { selectedMatch, selectedGameSet } = tourState;

  return useMutation(
    ['update-game-set-score'],
    (dto: GameSetScoreDto) => {
      return axiosFetcher.put<IGameSet, GameSetScoreDto>(
        `/match/${selectedMatch?.id}/game-set/${selectedGameSet?.id}/update-score`,
        dto
      );
    }
  );
}

export default useUpdateGameSetScoreMutation;
