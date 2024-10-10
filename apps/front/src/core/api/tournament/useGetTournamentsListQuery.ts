import { GetTournamentsQuery } from '@tennis-stats/dto';
import { ITournament } from '@tennis-stats/types';
import { useQuery } from 'react-query';
import queryString from 'query-string';

import axiosFetcher from '../axios/fetcher';

export function fetchTournamentsFn(query?: GetTournamentsQuery) {
  const params = queryString.stringify(query ?? {}, { arrayFormat: 'index' });

  return axiosFetcher.get<ITournament[]>(`/tournaments?${params}`, {
    skipToastError: false,
  });
}

export function useGetTournamentsListQuery(query?: GetTournamentsQuery) {
  return useQuery(['get-tournaments', query], () => fetchTournamentsFn(query), {
    staleTime: 100,
  });
}
