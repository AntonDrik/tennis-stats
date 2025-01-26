import { ExtendSeasonDto } from '@tennis-stats/dto';
import { useMutation, useQueryClient } from 'react-query';
import axiosFetcher from '../axios/fetcher';

type Dto = Omit<ExtendSeasonDto, 'parseDates'>;

function useExtendSeasonMutation(id?: number) {
  const queryClient = useQueryClient();

  return useMutation(
    ['extend-season'],
    (dto: Dto) => axiosFetcher.put<void, Dto>(`/seasons/${id}/extend`, dto),
    {
      onSuccess: () => {
        void queryClient.invalidateQueries({ queryKey: 'get-seasons' });
      },
    }
  );
}

export default useExtendSeasonMutation;
