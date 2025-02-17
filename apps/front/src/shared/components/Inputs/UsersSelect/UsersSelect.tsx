import { IUser, IUserWithRatingDiff } from '@tennis-stats/types';
import { Select as RadixSelect, Text } from '@radix-ui/themes';
import React, { useEffect, useMemo, useState } from 'react';
import { useGetUsersQuery } from '../../../../core/api';
import Select from '../../Select/Select';

interface IProps {
  label?: string;
  selectedUser?: IUser;
  disableUsers?: IUser[];
  fullWidth?: boolean;
  onChange?: (users: IUserWithRatingDiff) => void;
}

function UsersSelect(props: IProps) {
  const { data: allUsers, isLoading } = useGetUsersQuery();

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
    if (!props.disableUsers?.length) {
      return false;
    }

    return Boolean(props.disableUsers.find((user) => user.id === item.id));
  };

  const usersToDisplay = useMemo(() => allUsers ?? [], [allUsers]);

  useEffect(() => {
    if (props.selectedUser) {
      setSelectedUser(props.selectedUser);
      setSelectedUserId(String(props.selectedUser.id));
    }
  }, [props.selectedUser]);

  return (
    <Select
      value={selectedUserId}
      label={props.label}
      size={'3'}
      disabled={isLoading}
      fullWidth={props.fullWidth}
      onValueChange={handleChange}
    >
      <RadixSelect.Trigger>
        <Text>{selectedUser?.nickname}</Text>
      </RadixSelect.Trigger>

      <RadixSelect.Content position="popper" autoFocus={false}>
        {usersToDisplay.map((user) => (
          <RadixSelect.Item
            key={`user-select-item-${user.id}`}
            value={String(user.id)}
            autoFocus={false}
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
