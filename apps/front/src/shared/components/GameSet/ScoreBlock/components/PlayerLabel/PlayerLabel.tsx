import { Heading } from '@radix-ui/themes';
import { IPlayer } from '@tennis-stats/types';
import * as React from 'react';

interface IProps {
  player: IPlayer | undefined;
  number: 1 | 2;
}

function PlayerLabel(props: IProps) {
  const getLabel = () => {
    const { user } = props.player ?? {};

    if (!user) {
      return `Игрок ${props.number}`;
    }

    return `${user.nickname}`;
  };

  return (
    <Heading align={'center'} size={'5'}>
      {getLabel()}
    </Heading>
  );
}

export default PlayerLabel;
