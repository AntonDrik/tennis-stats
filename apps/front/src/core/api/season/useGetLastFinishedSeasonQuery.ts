import { ISeason } from '@tennis-stats/types';
import { toZonedTime } from 'date-fns-tz';
import { useQuery } from 'react-query';
import axiosFetcher from '../axios/fetcher';

function useGetLastFinishedSeasonQuery() {
  return useQuery(
    ['get-last-finished-season'],
    () => axiosFetcher.get<ISeason>(`/seasons/last-finished`),
    {
      select: (data) => ({
        ...data,
        startDate: toZonedTime(data.startDate, 'UTC'),
        endDate: toZonedTime(data.endDate, 'UTC'),
      }),
    }
  );
}

export default useGetLastFinishedSeasonQuery;
