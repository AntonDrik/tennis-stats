import InfoIcon from '@mui/icons-material/Info';
import IconButton from '@mui/material/IconButton';
import Popover, { PopoverOrigin } from '@mui/material/Popover';
import { IMatch } from '@tennis-stats/types';
import React, { MouseEvent, useState } from 'react';

import Styled from './RatingPopover.styles';
import { useMatchOrderQuery } from '../../../../core/api';
import Spinner from '../../Spinner/Spinner';
import RatingDeltaBlock from './components/RatingDeltaBlock/RatingDeltaBlock';


interface IProps {
  match: IMatch;
  position?: PopoverOrigin;
}

function RatingPopover(props: IProps) {

  const { data, isLoading } = useMatchOrderQuery(props.match.id);

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

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
        <RatingDeltaBlock data={data} title />
      </Popover>
    </Styled.Wrapper>
  );

}

export default RatingPopover;
