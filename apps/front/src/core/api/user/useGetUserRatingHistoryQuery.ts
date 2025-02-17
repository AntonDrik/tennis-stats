import { IRawUserRatingHistory } from '@tennis-stats/types';
import { AxiosError } from 'axios';
import { parseISO } from 'date-fns/parseISO';
import { useQuery } from 'react-query';
import axiosFetcher from '../axios/fetcher';

function useGetUserRatingHistoryQuery(id: number | string, year: string) {
  return useQuery<IRawUserRatingHistory, AxiosError>(
    [`get-user-rating-history-${id}`],
    () => axiosFetcher.get<IRawUserRatingHistory>(`/users/${id}/rating-history?year=${year}`),
    {
      select: (data) => ({
        ...data,
        list: data.list.map((item) => ({
          ...item,
          date: parseISO(item.date as unknown as string),
        })),
      }),
    }
  );
}

export default useGetUserRatingHistoryQuery;
