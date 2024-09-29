import { Typography } from '@mui/material';
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
    <Typography variant={'h5'} align={'center'} sx={{ cursor: 'pointer' }}>
      {getLabel()}
    </Typography>
  );
}

export default PlayerLabel;
