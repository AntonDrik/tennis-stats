import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import React from 'react';

import Styled from './ToggleButtons.styles';

interface IProps {
  value: string;
  scoreList: string[];
  onClick: (value: string) => void;
}

function ToggleButtons(props: IProps) {

  const scoreListMiddle = props.scoreList.length / 2;

  const firstListPart = props.scoreList.slice(0, scoreListMiddle);
  const secondListPart = props.scoreList.slice(scoreListMiddle).reverse();

  return (
    <Styled.Wrapper>
      <ToggleButtonGroup size='small' color={'info'} value={props.value}>
        {firstListPart.map((score) => (
          <ToggleButton
            key={score}
            value={score}
            sx={{ width: 60 }}
            onClick={() => props.onClick(score)}
          >{score}</ToggleButton>
        ))}
      </ToggleButtonGroup>

      <ToggleButtonGroup size='small' color={'info'} value={props.value}>
        {secondListPart.map((score) => (
          <ToggleButton
            key={score}
            value={score}
            sx={{ width: 60 }}
            onClick={() => props.onClick(score)}
          >{score}</ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Styled.Wrapper>
  );
}

export default ToggleButtons;
