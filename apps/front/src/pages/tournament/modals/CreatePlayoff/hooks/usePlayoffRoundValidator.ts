import { IUser } from '@tennis-stats/types';
import { useCallback } from 'react';

function usePlayoffRoundValidator(activeUsers: IUser[]) {
  return useCallback(
    (round: '1/8' | '1/4') => {
      const number = Number(round.split('/')[1]) * 2;

      if (!Number.isFinite(number)) {
        return false;
      }

      return activeUsers.length >= number;
    },
    [activeUsers]
  );
}

export default usePlayoffRoundValidator;
