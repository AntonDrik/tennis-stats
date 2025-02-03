import { IRatingHistory } from '@tennis-stats/types';
import { AxiosError } from 'axios';
import { useQuery } from 'react-query';
import axiosFetcher from '../axios/fetcher';

function useGetUserRatingHistoryQuery(id: number | string, year: string) {
  return useQuery<IRatingHistory[], AxiosError>([`get-user-rating-history-${id}`], () =>
    axiosFetcher.get<IRatingHistory[]>(`/users/${id}/rating-history?year=${year}`)
  );
}

export default useGetUserRatingHistoryQuery;
