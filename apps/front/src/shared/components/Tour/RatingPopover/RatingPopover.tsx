import InfoIcon from '@mui/icons-material/Info';
import IconButton from '@mui/material/IconButton';
import Popover, { PopoverOrigin } from '@mui/material/Popover';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { IMatch } from '@tennis-stats/types';
import React, { MouseEvent, useEffect, useMemo, useState } from 'react';

import ToggleButtons from './components/ToggleButtons/ToggleButtons';
import Styled from './RatingPopover.styles';
import { useMatchOrderQuery } from '../../../../core/api';
import Spinner from '../../Spinner/Spinner';


interface IProps {
  match: IMatch;
  position?: PopoverOrigin;
}

function RatingPopover(props: IProps) {

  const { data, isLoading } = useMatchOrderQuery(props.match.id);

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [selectedScore, setSelectedScore] = useState<string>('');

  const open = Boolean(anchorEl);

  const scoreList = useMemo(() => {
    return Object.keys(data ?? {}).sort().reverse();
  }, [data]);

  const usersDeltaList = useMemo(() => {
    if (!selectedScore || !data) {
      return [];
    }

    return Object.values((data ?? {})[selectedScore]);
  }, [selectedScore, data]);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  useEffect(() => {
    if (scoreList) {
      setSelectedScore(scoreList[0]);
    }
  }, [scoreList]);

  return (
    <Styled.Wrapper>
      <IconButton
        color={'info'}
        disabled={isLoading || !data}
        onClick={handleClick}
      >
        {isLoading && <Spinner />}
        <InfoIcon />
      </IconButton>


      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        transformOrigin={props.position ?? {
          vertical: 'top',
          horizontal: 'center'
        }}
      >
        <Stack p={2}>
          <Typography align={'center'} mb={1}>Дельта рейтинга при счете сетов</Typography>

          <ToggleButtons
            value={selectedScore}
            scoreList={scoreList}
            onClick={setSelectedScore}
          />

          {
            usersDeltaList.length > 0 &&
            <Stack mt={2} gap={1} direction={'row'} justifyContent={'center'}>
              <Typography>
                {usersDeltaList[0].userName}
                <b>({usersDeltaList[0].delta})</b>
              </Typography>

              <Typography>-</Typography>

              <Typography>
                {usersDeltaList[1].userName}
                <b>({usersDeltaList[1].delta})</b>
              </Typography>
            </Stack>
          }


        </Stack>
      </Popover>
    </Styled.Wrapper>
  );

}

export default RatingPopover;
