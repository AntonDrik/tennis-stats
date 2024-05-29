import { Typography } from '@mui/material';
import * as React from 'react';
import { IPlayer } from '@tennis-stats/types';
import { useAtomValue } from 'jotai';
import { serveAtom } from '../../state/Serve.state';

interface IProps {
  player: IPlayer | undefined;
  number: 1 | 2;
}

function PlayerLabel(props: IProps) {

  const serve = useAtomValue(serveAtom);

  const isPlayerServe = serve.player === props.number;

  return (
    <Typography variant={'h5'} fontWeight={isPlayerServe ? 600 : 400} align={'center'}>
      {props.player?.user.shortFullName ?? `Игрок ${props.number}`}
    </Typography>
  );

}

export default PlayerLabel;
