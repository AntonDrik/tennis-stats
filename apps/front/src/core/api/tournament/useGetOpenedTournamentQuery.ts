import { ITournament } from '@tennis-stats/types';
import { useQuery } from 'react-query';

import axiosFetcher from '../axios/fetcher';
import { TQueryOptions } from '../types';

function useGetOpenedTournamentQuery(options?: TQueryOptions<ITournament>) {
  return useQuery(
    [`get-opened-tournament`],
    () => axiosFetcher.get<ITournament>(`/tournaments/opened`),
    options
  );
}

export default useGetOpenedTournamentQuery;
