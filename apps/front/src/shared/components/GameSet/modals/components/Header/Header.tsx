import { Stack, Typography } from '@mui/material';
import { useAtomValue } from 'jotai';
import * as React from 'react';
import { tournamentAtom } from '../../../../../../core/store';
import { IGameSet } from '@tennis-stats/types';

interface IProps {
  title?: (gameSet: IGameSet | null) => string;
}

function ModalHeader(props: IProps) {
  const tourPageState = useAtomValue(tournamentAtom);

  const gameSet = tourPageState.selectedGameSet;

  const title = props.title ? props.title(gameSet) : `Сет № ${gameSet?.number}`;

  return (
    <Stack
      justifyContent={'center'}
      alignItems={'center'}
      direction={'row'}
      px={3}
      py={2}
    >
      <Typography variant={'h4'} align={'center'}>
        {title}
      </Typography>
    </Stack>
  );
}

export default ModalHeader;
