import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { SxProps } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import { TMatchRatingDelta } from '@tennis-stats/types';
import ToggleButtons from '../ToggleButtons/ToggleButtons';

interface IProps {
  data: TMatchRatingDelta | undefined;
  title?: boolean;
  wrapperSx?: SxProps;
}

function RatingDeltaBlock(props: IProps) {

  const [selectedScore, setSelectedScore] = useState<string>('');

  const scoreList = useMemo(() => {
    return Object.keys(props.data ?? {}).sort().reverse();
  }, [props.data]);

  const usersDeltaList = useMemo(() => {
    if (!selectedScore || !props.data) {
      return [];
    }

    return Object.values((props.data ?? {})[selectedScore]);
  }, [selectedScore, props.data]);

  useEffect(() => {
    if (scoreList) {
      setSelectedScore(scoreList[0]);
    }
  }, [scoreList]);

  return (
    <Stack p={2} sx={props.wrapperSx}>
      {
        props.title &&
        <Typography align={'center'} mb={1}>Дельта рейтинга при счете сетов</Typography>
      }

      <ToggleButtons
        value={selectedScore}
        scoreList={scoreList}
        onClick={setSelectedScore}
      />

      {
        usersDeltaList.length > 0 &&
        <Stack mt={2} gap={1} direction={'row'} justifyContent={'center'}>
          <Typography fontSize={14}>
            {usersDeltaList[0].userName}
            <b>({usersDeltaList[0].delta})</b>
          </Typography>

          <Typography fontSize={14}>-</Typography>

          <Typography fontSize={14}>
            {usersDeltaList[1].userName}
            <b>({usersDeltaList[1].delta})</b>
          </Typography>
        </Stack>
      }


    </Stack>
  );

}

export default RatingDeltaBlock;
