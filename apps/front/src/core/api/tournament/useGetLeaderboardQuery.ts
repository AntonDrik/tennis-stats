import { ILeaderboardItem } from '@tennis-stats/types';
import { useQuery } from 'react-query';

import axiosFetcher from '../axios/fetcher';

function useGetLeaderboardQuery(id: string | number | undefined) {
  return useQuery([`get-leaderboard`], () =>
    axiosFetcher.get<ILeaderboardItem[]>(`/tournaments/${id ?? -1}/leaderboard`)
  );
}

export default useGetLeaderboardQuery;
