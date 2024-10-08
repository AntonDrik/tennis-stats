import { Box, Text } from '@radix-ui/themes';
import React, { ReactNode } from 'react';
import styled from 'styled-components';

interface IGroupBoxProps {
  caption: string;
  bgcolor?: string;
  children: ReactNode;
}

const Container = styled(Box)<{ bgcolor?: string }>(
  () => ({
    border: '1px solid var(--sage-6)',
    borderRadius: '12px',
    position: 'relative',
  }),
  ({ bgcolor }) => ({
    backgroundColor: bgcolor,
  })
);

const Caption = styled(Box)(() => ({
  position: 'absolute',
  top: -13,
  left: 13,
  padding: '0 5px',
  backgroundColor: 'var(--accent-1)',
}));

const Legend = styled('legend')(() => ({
  position: 'absolute',

  padding: '0 5px',
  top: '-1px',
  maxWidth: 1000,
  height: 1,
  fontSize: '1rem',
}));

export function GroupBox({
  caption,
  bgcolor,
  children,
  ...rest
}: IGroupBoxProps): JSX.Element {
  return (
    <Container p={'4'} {...rest} bgcolor={bgcolor}>
      <Legend>
        <span style={{ visibility: 'hidden' }}>{caption}</span>
      </Legend>

      <Caption>
        <Text weight={'medium'}>{caption}</Text>
      </Caption>

      {children}
    </Container>
  );
}
