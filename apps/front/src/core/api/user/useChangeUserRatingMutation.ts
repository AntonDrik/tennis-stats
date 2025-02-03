import { ChangeRatingDto } from '@tennis-stats/dto';
import { useMutation, useQueryClient } from 'react-query';
import axiosFetcher from '../axios/fetcher';

function useChangeUserRatingMutation() {
  const queryClient = useQueryClient();

  return useMutation(['change-rating'], (dto: ChangeRatingDto) => {
    return axiosFetcher.put<void, ChangeRatingDto>(`/users/${dto.userId}/change-rating`, dto);
  });
}

export default useChangeUserRatingMutation;
