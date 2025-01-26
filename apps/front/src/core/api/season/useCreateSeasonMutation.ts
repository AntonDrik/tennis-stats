import { CreateSeasonDto } from '@tennis-stats/dto';
import { useMutation, useQueryClient } from 'react-query';
import axiosFetcher from '../axios/fetcher';

type Dto = Omit<CreateSeasonDto, 'parseDates'>;

function useCreateSeasonMutation() {
  const queryClient = useQueryClient();

  return useMutation(
    ['create-season'],
    (dto: Dto) => axiosFetcher.post<void, Dto>(`/seasons`, dto),
    {
      onSuccess: () => {
        void queryClient.invalidateQueries({ queryKey: 'get-seasons' });
      },
    }
  );
}

export default useCreateSeasonMutation;
