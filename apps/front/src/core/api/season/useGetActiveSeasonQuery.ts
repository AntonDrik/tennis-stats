import { ISeason } from '@tennis-stats/types';
import { parseISO } from 'date-fns/parseISO';
import { useQuery } from 'react-query';
import axiosFetcher from '../axios/fetcher';

function useGetActiveSeasonQuery() {
  return useQuery(['get-active-season'], () => axiosFetcher.get<ISeason>(`/seasons/active`), {
    select: (data) => ({
      ...data,
      startDate: parseISO(data.startDate as unknown as string),
      endDate: parseISO(data.endDate as unknown as string),
    }),
  });
}

export default useGetActiveSeasonQuery;
