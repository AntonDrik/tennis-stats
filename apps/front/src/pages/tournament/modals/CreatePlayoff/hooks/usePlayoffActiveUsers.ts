import { ILeaderboardItem } from '@tennis-stats/types';
import { useMemo } from 'react';

function usePlayoffActiveUsers(
  leaderboard: ILeaderboardItem[] | undefined,
  removedUsersIds: number[]
) {
  return useMemo(() => {
    if (!leaderboard) {
      return [];
    }

    return leaderboard
      .filter((item) => !removedUsersIds.includes(item.user.id))
      .map((item) => item.user);
  }, [leaderboard, removedUsersIds]);
}

export default usePlayoffActiveUsers;
