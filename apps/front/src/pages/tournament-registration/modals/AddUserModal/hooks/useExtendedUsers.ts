import { IUser } from '@tennis-stats/types';
import { useMemo } from 'react';
import { useGetUsersQuery } from '../../../../../core/api';

interface IExtendedUsers {
  allList: IUser[];
  notJoinedList: IUser[];
  joinedIdsList: number[];
}

function useExtendedUsers(joinedUsers: IUser[]): IExtendedUsers {
  const users = useGetUsersQuery();

  return useMemo(() => {
    if (!users.data) {
      return {
        allList: [],
        notJoinedList: [],
        joinedIdsList: [],
      };
    }

    const validUsersList = users.data.filter((user) => user.nickname !== 'Халява');
    const joinedUsersIds = joinedUsers.map((joinedUser) => joinedUser.id);

    return {
      allList: validUsersList,
      notJoinedList: validUsersList.filter((user) => !joinedUsersIds.includes(user.id)),
      joinedIdsList: joinedUsersIds,
    };
  }, [users.data, joinedUsers]);
}

export default useExtendedUsers;
