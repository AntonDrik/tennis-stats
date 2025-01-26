import { ISeasonWithStats } from '@tennis-stats/types';
import { toZonedTime } from 'date-fns-tz';
import { useQuery } from 'react-query';
import axiosFetcher from '../axios/fetcher';

function useGetSeasonsQuery() {
  return useQuery(['get-seasons'], () => axiosFetcher.get<ISeasonWithStats[]>(`/seasons`), {
    select: (data) => {
      return data.map((item) => ({
        ...item,
        startDate: toZonedTime(item.startDate, 'UTC'),
        endDate: toZonedTime(item.endDate, 'UTC'),
      }));
    },
  });
}

export default useGetSeasonsQuery;
