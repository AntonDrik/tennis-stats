import { IdDto } from '@tennis-stats/dto';
import { useMutation } from 'react-query';
import axiosFetcher from '../axios/fetcher';

function useResetPasswordMutation() {
  return useMutation(['reset-password'], (dto: IdDto) => {
    return axiosFetcher.post<void, IdDto>('/auth/reset-password', dto);
  });
}

export default useResetPasswordMutation;
