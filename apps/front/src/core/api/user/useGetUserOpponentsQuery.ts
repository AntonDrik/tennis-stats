import { IOpponent } from '@tennis-stats/types';
import { AxiosError } from 'axios';
import { useQuery } from 'react-query';
import axiosFetcher from '../axios/fetcher';

function useGetUserOpponentsQuery(id?: number | string) {
  return useQuery<IOpponent[], AxiosError>([`get-user-opponents-${id ?? -1}`], () =>
    axiosFetcher.get<IOpponent[]>(`/users/${id ?? -1}/opponents`)
  );
}

export default useGetUserOpponentsQuery;
