import { Typography } from '@mui/material';
import { IPlayer } from '@tennis-stats/types';
import { useAtomValue, useSetAtom } from 'jotai';
import * as React from 'react';
import { isDopsScoreAtom } from '../../state/Score.state';
import { changeServeAtom, serveAtom } from '../../state/Serve.state';

interface IProps {
  player: IPlayer | undefined;
  number: 1 | 2;
}

function PlayerLabel(props: IProps) {

  const serve = useAtomValue(serveAtom);
  const isDopsScore = useAtomValue(isDopsScoreAtom);
  const changeServe = useSetAtom(changeServeAtom);

  const isPlayerServe = serve.player === props.number;

  const getLabel = () => {
    const { user } = props.player ?? {};

    if (!user) {
      return `Игрок ${props.number}`;
    }

    const serveCaption = isPlayerServe && !isDopsScore ? `(${serve.count}/2)` : '';

    return `${user.lastName} ${serveCaption}`;
  };

  const handleClick = () => {
    changeServe(props.number);
  };

  return (
    <Typography
      variant={'h5'}
      fontWeight={isPlayerServe ? 600 : 400}
      align={'center'}
      sx={{ cursor: 'pointer' }}
      onClick={handleClick}
    >
      {getLabel()}
    </Typography>
  );

}

export default PlayerLabel;
