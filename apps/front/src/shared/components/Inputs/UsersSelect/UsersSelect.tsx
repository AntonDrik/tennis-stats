import { IUser, IUserWithRatingDiff } from '@tennis-stats/types';
import { Select as RadixSelect, Spinner, Text } from '@radix-ui/themes';
import React, { useMemo, useState } from 'react';
import { useUsersQuery } from '../../../../core/api';
import Select from '../../Select/Select';

interface IProps {
  skipUsers?: IUser[];
  disableSkippedUsers?: boolean;
  onChange?: (users: IUserWithRatingDiff) => void;
}

function UsersSelect(props: IProps) {
  const { data: allUsers, isLoading } = useUsersQuery();

  const [selectedUserId, setSelectedUserId] = useState<string>();
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);

  const handleChange = (value: string) => {
    if (!value) {
      return;
    }

    const user = usersToDisplay.find((user) => String(user.id) === value);

    setSelectedUser(user ?? null);
    setSelectedUserId(value);

    if (user) {
      props.onChange?.(user);
    }
  };

  const isDisabledItem = (item: IUser) => {
    if (!props.disableSkippedUsers || !props.skipUsers?.length) {
      return false;
    }

    return Boolean(props.skipUsers.find((user) => user.id === item.id));
  };

  const usersToDisplay = useMemo(() => {
    if (props.disableSkippedUsers) {
      return allUsers ?? [];
    }

    const skipIds = props.skipUsers?.map((user) => user?.id) ?? [];

    return (allUsers ?? []).filter((user) => !skipIds.includes(user.id));
  }, [allUsers, props.skipUsers, props.disableSkippedUsers]);

  return (
    <Select
      value={selectedUserId}
      label={'Выберите нового пользователя'}
      size={'3'}
      disabled={isLoading}
      onValueChange={handleChange}
    >
      <RadixSelect.Trigger>
        {isLoading && <Spinner />}
        <Text>{selectedUser?.nickname}</Text>
      </RadixSelect.Trigger>

      <RadixSelect.Content position="popper">
        {usersToDisplay.map((user) => (
          <RadixSelect.Item
            key={`user-select-item-${user.id}`}
            value={String(user.id)}
            disabled={isDisabledItem(user)}
          >
            {user.nickname}
          </RadixSelect.Item>
        ))}
      </RadixSelect.Content>
    </Select>
  );
}

export default UsersSelect;
