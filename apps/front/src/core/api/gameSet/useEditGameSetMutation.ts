import { GameSetScoreDto } from '@tennis-stats/dto';
import { IGameSet } from '@tennis-stats/types';
import { useMutation, useQueryClient } from 'react-query';
import axiosFetcher from '../axios/fetcher';
import { ITournamentState } from '../../store';

function useEditGameSetMutation(tournamentState: ITournamentState) {
  const queryClient = useQueryClient();

  const tournamentId = tournamentState.selectedTournament?.id;
  const tourId = tournamentState.selectedTour?.id;
  const matchId = tournamentState.selectedMatch?.id;
  const gameSetId = tournamentState.selectedGameSet?.id;

  return useMutation(
    ['edit-game-set-score'],
    (dto: GameSetScoreDto) => {
      return axiosFetcher.put<IGameSet, GameSetScoreDto>(
        `tournaments/${tournamentId}/tours/${tourId}/match/${matchId}/game-set/${gameSetId}/edit`,
        dto
      );
    },
    {
      onSuccess: () => {
        void queryClient.invalidateQueries({ queryKey: 'get-tournament' });
      },
    }
  );
}

export default useEditGameSetMutation;
