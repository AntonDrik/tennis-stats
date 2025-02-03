import { IUserCommonStats } from '@tennis-stats/types';
import { useQuery } from 'react-query';
import axiosFetcher from '../axios/fetcher';

function useUserCommonStatsQuery(userId: number) {
  return useQuery([`user-${userId}__common-stats`], () =>
    axiosFetcher.get<IUserCommonStats>(`users/${userId}/common-stats`)
  );
}

export default useUserCommonStatsQuery;
