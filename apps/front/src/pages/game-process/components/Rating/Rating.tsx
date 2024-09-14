import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Button, IconButton, Typography } from '@mui/material';
import { useState } from 'react';
import { useMatchOrderQuery } from '../../../../core/api';
import { RatingDeltaBlock } from '../../../../shared/components/Tour/RatingDelta';

import Styled from './Rating.styles';

interface IProps {
  matchId: number;
}

function Rating(props: IProps) {

  const { data } = useMatchOrderQuery(props.matchId ?? 0);

  const [isOpen, setIsOpen] = useState(false);

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Styled.Wrapper>
      <Typography mb={0.5}>Дельта рейтинга</Typography>

      <Styled.ButtonWrapper isOpen={isOpen}>
        <RatingDeltaBlock data={data} wrapperSx={{ pt: 0, pb: 5 }} />
      </Styled.ButtonWrapper>

      <Button fullWidth sx={{ height: 30 }} color={'info'} onClick={handleButtonClick}>
        <IconButton>
          {isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </IconButton>
      </Button>
    </Styled.Wrapper>
  );

}

export default Rating;
