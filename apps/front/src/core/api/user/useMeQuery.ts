import { IUser } from '@tennis-stats/types';
import { useQuery } from 'react-query';
import { updateMeStore } from '../../store';
import axiosFetcher from '../axios/fetcher';

export function fetchMe() {
  return axiosFetcher.get<IUser>('/users/me', { skipToastError: true });
}

function useMeQuery() {
  return useQuery<IUser>(['get-me'], fetchMe, {
    onSuccess: updateMeStore,
  });
}

export default useMeQuery;
