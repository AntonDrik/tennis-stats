import { UpdateMatchStatisticDto } from '@tennis-stats/dto';
import { IGameSet } from '@tennis-stats/types';
import { useMutation } from 'react-query';
import axiosFetcher from '../axios/fetcher';


function useUpdateStatMutation() {

  return useMutation(
    ['update-match-stat'],
    (dto: UpdateMatchStatisticDto) => {
      return axiosFetcher.put<IGameSet, UpdateMatchStatisticDto>(
        `/match/update-stat`,
        dto
      );
    }
  );
}

export default useUpdateStatMutation;
