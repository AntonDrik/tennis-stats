import { IUser } from '@tennis-stats/types';
import { AxiosError } from 'axios';
import { useQuery } from 'react-query';
import { meAtom, meStore, updateMeStore } from '../../store';
import axiosFetcher from '../axios/fetcher';

function useGetUserQuery(id?: number | string) {
  return useQuery<IUser, AxiosError>(
    [`get-user-${id ?? -1}`],
    () => axiosFetcher.get<IUser>(`/users/${id ?? -1}`),
    {
      onSuccess: (data) => {
        const currMe = meStore.get(meAtom);
        if (currMe?.id === data.id) {
          updateMeStore(data);
        }
      },
    }
  );
}

export default useGetUserQuery;
