import { Stack, Typography } from '@mui/material';
import { useAtomValue } from 'jotai';
import * as React from 'react';
import { tourPageStateAtom } from '../../../TourPage.state';
import { IGameSet } from '@tennis-stats/types';
import RatingPopover from '../../../../../shared/components/Tour/RatingPopover/RatingPopover';

interface IProps {
  title?: (gameSet: IGameSet | null) => string;
  showRatingDelta?: boolean;
}

function ModalHeader(props: IProps) {

  const tourPageState = useAtomValue(tourPageStateAtom);

  const gameSet = tourPageState.selectedGameSet;
  const match = tourPageState.selectedMatch;
  const showRatingDelta = props.showRatingDelta && match;

  const title = props.title ? props.title(gameSet) : `Сет № ${gameSet?.number}`;

  return (
    <Stack justifyContent={'center'} alignItems={'center'} direction={'row'} px={3} py={2}>
      <Typography variant={'h4'} align={'center'}>
        {title}
      </Typography>

      {
        showRatingDelta &&
        <RatingPopover
          match={match}
          position={{ vertical: 'top', horizontal: 'center' }}
        />
      }
    </Stack>
  );

}

export default ModalHeader;
