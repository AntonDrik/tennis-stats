import { RegistrationDto } from '@tennis-stats/dto';
import { useMutation, useQueryClient } from 'react-query';
import axiosFetcher from '../axios/fetcher';

function useRegistrationMutation(invalidateUsers = false) {
  const queryClient = useQueryClient();

  return useMutation(
    ['registration'],
    (dto: RegistrationDto) =>
      axiosFetcher.post<void, RegistrationDto>(`/auth/registration`, dto),
    {
      onSuccess: () => {
        if (invalidateUsers) {
          void queryClient.invalidateQueries({ queryKey: 'get-users' });
        }
      },
    }
  );
}

export default useRegistrationMutation;
