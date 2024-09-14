import { IPairStatistic } from '@tennis-stats/types';
import queryString from 'query-string';
import { useQuery } from 'react-query';
import axiosFetcher from '../axios/fetcher';

interface IArgs {
  startDate: string;
  endDate: string;
}

function usePairStatisticQuery(args: IArgs | null) {
  const params = args ? `?${queryString.stringify(args)}` : '';

  return useQuery<IPairStatistic[]>(
    [`pair-statistic`, `pair-statistic-${params}`],
    (d) => axiosFetcher.get(`/statistic/pair${params}`)
  );
}

export default usePairStatisticQuery;
