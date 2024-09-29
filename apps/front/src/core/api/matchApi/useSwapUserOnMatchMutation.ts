import { SwapUserDto } from '@tennis-stats/dto';
import { IMatch } from '@tennis-stats/types';
import { useMutation, useQueryClient } from 'react-query';
import { ITournamentState } from '../../store';
import axiosFetcher from '../axios/fetcher';

function useSwapUserOnMatchMutation(tournamentState: ITournamentState) {
  const tournamentId = tournamentState.selectedTournament?.id;
  const tourId = tournamentState.selectedTour?.id;
  const matchId = tournamentState.selectedMatch?.id;

  const queryClient = useQueryClient();

  return useMutation(
    'swap-user-on-match',
    (dto: SwapUserDto) =>
      axiosFetcher.patch<IMatch, SwapUserDto>(
        `/tournaments/${tournamentId}/tours/${tourId}/match/${matchId}/swap-user`,
        dto
      ),
    {
      onSuccess: () => {
        void queryClient.invalidateQueries({ queryKey: 'get-tournament' });
      },
    }
  );
}

export default useSwapUserOnMatchMutation;
