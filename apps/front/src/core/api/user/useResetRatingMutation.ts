import { AxiosError } from 'axios';
import { useMutation } from 'react-query';
import axiosFetcher from '../axios/fetcher';

// TODO: сделать отдельный модуль Settings
function useResetRatingMutation() {
  return useMutation<void, AxiosError>(['reset-rating'], () =>
    axiosFetcher.post<void>('/users/reset-rating')
  );
}

export default useResetRatingMutation;
