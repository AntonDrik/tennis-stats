import { IGameSet } from '@tennis-stats/types';
import { useMutation, useQueryClient } from 'react-query';
import { ITourPageState } from '../../store';
import axiosFetcher from '../axios/fetcher';


function useStartGameSetMutation(tourPageState: ITourPageState) {

  const queryClient = useQueryClient();

  const { selectedMatch, selectedGameSet } = tourPageState;

  return useMutation(
    ['start-game-tour'],
    () => axiosFetcher.post<IGameSet>(`/match/${selectedMatch?.id}/game-set/${selectedGameSet?.id}/start`),
    {
      onSuccess: () => {
        void queryClient.invalidateQueries({ queryKey: 'get-tours' });
      }
    }
  );
}

export default useStartGameSetMutation;
