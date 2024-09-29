import { NumberInputProps } from '@mui/base/Unstable_NumberInput';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Stack, SxProps } from '@mui/material';
import React, { ReactElement } from 'react';
import { CSSObject } from 'styled-components';

import Styled from './VerticalNumberInput.styles';

interface IProps extends Omit<NumberInputProps, 'onChange'> {
  onChange: (value: number) => void;
  renderInput?: () => ReactElement;
  wrapperSx?: SxProps;
  buttonStyle?: CSSObject;
}

const VerticalNumberInput = (props: IProps) => {
  const incrementClick = () => {
    const newValue = (props.value ?? 0) + 1;

    if (isValid(newValue)) {
      props.onChange(newValue);
    }
  };

  const decrementClick = () => {
    const newValue = (props.value ?? 0) - 1;

    if (isValid(newValue)) {
      props.onChange(newValue);
    }
  };

  const isValid = (value: number) => {
    if ('max' in props && 'min' in props) {
      // @ts-ignore
      return value <= props.max && value >= props.min;
    }

    if ('max' in props) {
      // @ts-ignore
      return value <= props.max;
    }

    if ('min' in props) {
      // @ts-ignore
      return value >= props.min;
    }

    return true;
  };

  const getInput = () => {
    if (props.renderInput) {
      return props.renderInput();
    }

    return <Styled.StyledInput>{props.value}</Styled.StyledInput>;
  };

  return (
    <Stack gap={1.5} alignItems={'center'} sx={props.wrapperSx}>
      <Styled.StyledButton $styles={props.buttonStyle} onClick={incrementClick}>
        <AddIcon fontSize="small" />
      </Styled.StyledButton>

      {getInput()}

      <Styled.StyledButton $styles={props.buttonStyle} onClick={decrementClick}>
        <RemoveIcon fontSize="small" />
      </Styled.StyledButton>
    </Stack>
  );
};

export default VerticalNumberInput;
