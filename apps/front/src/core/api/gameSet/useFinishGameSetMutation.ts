import { GameSetScoreDto } from '@tennis-stats/dto';
import { IGameSet } from '@tennis-stats/types';
import { useMutation, useQueryClient } from 'react-query';
import { ITournamentState } from '../../store';
import axiosFetcher from '../axios/fetcher';

function useFinishGameSetMutation(tournamentState: ITournamentState) {
  const queryClient = useQueryClient();

  const tournamentId = tournamentState.selectedTournament?.id;
  const tourId = tournamentState.selectedTour?.id;
  const matchId = tournamentState.selectedMatch?.id;
  const gameSetId = tournamentState.selectedGameSet?.id;

  return useMutation(
    [`finish-game-set-${matchId}`],
    (dto: GameSetScoreDto) => {
      return axiosFetcher.post<IGameSet, GameSetScoreDto>(
        `tournaments/${tournamentId}/tours/${tourId}/match/${matchId}/game-set/${gameSetId}/finish`,
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

export default useFinishGameSetMutation;
