import { IUserPairStats } from '@tennis-stats/types';
import queryString from 'query-string';
import { useQuery } from 'react-query';
import axiosFetcher from '../axios/fetcher';

function useUserPairStatsQuery(userId: number, opponentId: number | undefined) {
  const params = queryString.stringify({ opponentId }, { arrayFormat: 'index' });

  return useQuery<IUserPairStats>(
    [`user-${userId}__pair-stats`],
    () => axiosFetcher.get<IUserPairStats>(`users/${userId}/pair-stats?${params}`),
    { enabled: Number.isFinite(opponentId) }
  );
}

export default useUserPairStatsQuery;
