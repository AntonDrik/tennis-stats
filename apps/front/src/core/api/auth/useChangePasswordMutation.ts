import { ChangePasswordDto } from '@tennis-stats/dto';
import { useMutation } from 'react-query';
import axiosFetcher from '../axios/fetcher';

function useChangePasswordMutation() {
  return useMutation(['change-password'], (dto: ChangePasswordDto) => {
    return axiosFetcher.put<void, ChangePasswordDto>('/auth/change-password', dto);
  });
}

export default useChangePasswordMutation;
