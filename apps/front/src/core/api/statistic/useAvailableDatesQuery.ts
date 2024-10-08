import { IAvailableDates } from '@tennis-stats/types';
import { useQuery } from 'react-query';
import axiosFetcher from '../axios/fetcher';

function useAvailableDatesQuery() {
  return useQuery<IAvailableDates[]>(
    [`available-dates`],
    (d) => axiosFetcher.get(`/statistic/available-dates`)
  );
}

export default useAvailableDatesQuery;
