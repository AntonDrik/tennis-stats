import { IUser } from '@tennis-stats/types';
import axiosFetcher from '../axios/fetcher';

export function fetchMe() {
  return axiosFetcher.get<IUser>('/users/me', { skipToastError: true });
}
