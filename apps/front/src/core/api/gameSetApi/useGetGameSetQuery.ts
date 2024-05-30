import { IGameSet } from '@tennis-stats/types';
import { useQuery } from 'react-query';
import axiosFetcher from '../axios/fetcher';
import { TQueryOptions } from '../types';
import { ITourPageState } from '../../../pages/tour/TourPage.state';


function useGetGameSetQuery(tourPageState: ITourPageState, refetchIntervalMs?: number, options?: TQueryOptions<IGameSet>) {
  const { selectedMatch, selectedGameSet } = tourPageState;

  return useQuery(
    ['get-gameSet', `get-gameSet-${selectedMatch?.id}-${selectedGameSet?.id}`],
    () => axiosFetcher.get<IGameSet>(`/match/${selectedMatch?.id}/game-set/${selectedGameSet?.id}`),
    {
      refetchOnMount: true,
      ...(refetchIntervalMs ? { refetchInterval: refetchIntervalMs } : {}),
      ...options
    }
  );
}

export default useGetGameSetQuery;