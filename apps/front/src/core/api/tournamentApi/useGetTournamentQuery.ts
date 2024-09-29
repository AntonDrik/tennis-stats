import { ITournament } from '@tennis-stats/types';
import { useQuery } from 'react-query';

import axiosFetcher from '../axios/fetcher';
import { TQueryOptions } from '../types';

function useGetTournamentQuery(
  id: string | number | undefined,
  options?: TQueryOptions<ITournament>
) {
  return useQuery(
    [`get-tournament`, `tournament-${String(id ?? -1)}`],
    () => axiosFetcher.get<ITournament>(`/tournaments/${id ?? -1}`),
    options
  );
}

export default useGetTournamentQuery;
