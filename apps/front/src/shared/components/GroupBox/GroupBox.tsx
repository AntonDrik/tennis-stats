import { BoxProps, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import React, { ReactNode } from 'react';
import styled from 'styled-components';

interface IGroupBoxProps extends BoxProps {
  caption: string;
  children: ReactNode;
}

const Container = styled(Box)(() => ({
  border: '1px solid #d1d1d1',
  borderRadius: '.25rem',
  position: 'relative',
}));

const Caption = styled(Box)(() => ({
  position: 'absolute',
  top: -13,
  left: 13,
  padding: '0 5px',
}));

const Legend = styled('legend')(() => ({
  position: 'absolute',
  backgroundColor: 'inherit',
  padding: '0 3px',
  top: '-1px',
  maxWidth: 1000,
  height: 1,
  fontSize: '1rem',
}));

export function GroupBox({
  caption,
  children,
  ...rest
}: IGroupBoxProps): JSX.Element {
  return (
    <Container p={2} {...rest}>
      <Legend>
        <span style={{ visibility: 'hidden' }}>{caption}</span>
      </Legend>

      <Caption>
        <Typography>{caption}</Typography>
      </Caption>

      {children}
    </Container>
  );
}
