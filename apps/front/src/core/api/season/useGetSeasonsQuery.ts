import { GetSeasonsQuery } from '@tennis-stats/dto';
import { ISeasonWithStats } from '@tennis-stats/types';
import { toZonedTime } from 'date-fns-tz';
import queryString from 'query-string';
import { useQuery } from 'react-query';
import axiosFetcher from '../axios/fetcher';

function useGetSeasonsQuery(query: GetSeasonsQuery) {
  const params = queryString.stringify(query ?? {}, { arrayFormat: 'index' });

  return useQuery(
    ['get-seasons'],
    () => axiosFetcher.get<ISeasonWithStats[]>(`/seasons?${params}`),
    {
      select: (data) => {
        return data.map((item) => ({
          ...item,
          startDate: toZonedTime(item.startDate, 'UTC'),
          endDate: toZonedTime(item.endDate, 'UTC'),
        }));
      },
    }
  );
}

export default useGetSeasonsQuery;
