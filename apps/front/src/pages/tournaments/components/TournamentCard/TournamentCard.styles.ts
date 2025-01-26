import { Box, Flex } from '@radix-ui/themes';
import styled from 'styled-components';

const Card = styled(Box)({
  width: '100%',
  minHeight: '200px',
  cursor: 'pointer',
  borderRadius: 'var(--radius-4)',
  backgroundColor: 'var(--sage-2)',
  border: '1px solid var(--sage-4)',
  padding: 'var(--space-3)',

  '&:hover': {
    backgroundColor: 'var(--sage-3)',
  },
});

const CardHeader = styled(Flex)({
  overflow: 'auto',
  scrollbarWidth: 'none',
  '-ms-overflow-style': 'none',
});

export default { Card, CardHeader };
