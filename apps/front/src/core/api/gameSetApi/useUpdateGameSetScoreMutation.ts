import { GameSetScoreDto } from '@tennis-stats/dto';
import { IGameSet } from '@tennis-stats/types';
import { useMutation } from 'react-query';
import { ITourPageState } from '../../store';
import axiosFetcher from '../axios/fetcher';


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
