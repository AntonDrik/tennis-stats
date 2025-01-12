import { ILeaderboard } from '@tennis-stats/types';
import { useMemo } from 'react';

function usePlayoffActiveUsers(
  leaderboard: ILeaderboard | undefined,
  removedUsersIds: number[]
) {
  return useMemo(() => {
    if (!leaderboard?.toursLeaderboard) {
      return [];
    }

    return leaderboard.toursLeaderboard
      .filter((item) => !removedUsersIds.includes(item.user.id))
      .map((item) => item.user);
  }, [leaderboard?.toursLeaderboard, removedUsersIds]);
}

export default usePlayoffActiveUsers;
