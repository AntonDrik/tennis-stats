import { IOpponent, IUser } from '@tennis-stats/types';
import { Badge, Select as RadixSelect } from '@radix-ui/themes';
import React, { useMemo, useState } from 'react';
import { useGetUserOpponentsQuery } from '../../../../../../core/api';
import { Select } from '../../../../../../shared/components';
import { useEnumerableString } from '../../../../../../shared/hooks';

interface IProps {
  userId: number;
  onChange?: (users: IUser) => void;
}

function OpponentSelect(props: IProps) {
  const { data: allUsers, isLoading } = useGetUserOpponentsQuery(props.userId);

  const [isSelected, setIsSelected] = useState<boolean>(false);

  const enumerable = useEnumerableString(['Игра', 'Игры', 'Игр']);

  const handleChange = (value: string) => {
    if (!value) {
      return;
    }

    const opponent = opponentsToDisplay.find((opponent) => String(opponent.user.id) === value);

    setIsSelected(true);

    if (opponent) {
      props.onChange?.(opponent.user);
    }
  };

  const opponentsToDisplay = useMemo(() => allUsers ?? [], [allUsers]);

  return (
    <Select
      label={isSelected ? 'Соперник' : undefined}
      size={'3'}
      disabled={isLoading}
      fullWidth
      onValueChange={handleChange}
    >
      <RadixSelect.Trigger placeholder={'Выберите соперника'} />

      <RadixSelect.Content placeholder={'ss'} position="popper" variant={'soft'}>
        {opponentsToDisplay.map((opponent) => (
          <RadixSelect.Item
            key={`opponent-select-item-${opponent.user.nickname}`}
            value={String(opponent.user.id)}
          >
            {opponent.user.nickname} <Badge>{enumerable(opponent.gamesCount)}</Badge>
          </RadixSelect.Item>
        ))}
      </RadixSelect.Content>
    </Select>
  );
}

export default OpponentSelect;
