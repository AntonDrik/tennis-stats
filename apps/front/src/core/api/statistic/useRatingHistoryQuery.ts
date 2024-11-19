import { IAvgRatingByDay } from '@tennis-stats/types';
import { useQuery } from 'react-query';
import axiosFetcher from '../axios/fetcher';

function useRatingHistoryQuery(userId?: number) {
  const url = userId ? `/rating/history/user/${userId}` : '/rating/history';

  return useQuery<IAvgRatingByDay[]>([`rating-history-${userId}`], () =>
    axiosFetcher.get<IAvgRatingByDay[]>(url)
  );
}

export default useRatingHistoryQuery;
