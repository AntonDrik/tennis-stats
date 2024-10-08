import { IUser } from '@tennis-stats/types';
import { useMemo } from 'react';
import { useUsersQuery } from '../../../../../core/api';

function useNotJoinedUsers(joinedUsers: IUser[]) {
  const users = useUsersQuery();

  return useMemo(() => {
    if (!users.data) {
      return [];
    }

    const joinedUsersIds = joinedUsers.map((joinedUser) => joinedUser.id);

    return users.data.filter(
      (user) => !joinedUsersIds.includes(user.id) && user.nickname !== 'Халява'
    );
  }, [users.data, joinedUsers]);
}

export default useNotJoinedUsers;
