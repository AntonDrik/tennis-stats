import { Card as RadixCard } from '@radix-ui/themes';
import styled from 'styled-components';

const Card = styled(RadixCard)({
  width: '100%',
  aspectRatio: '1 / 1',
  cursor: 'pointer',
  backgroundColor: 'var(--sage-3)',
  borderColor: '#DAD9D6',

  '&:hover': {
    backgroundColor: 'var(--sage-5)',
  },
});

const CardHeader = styled.div({
  position: 'relative',
  width: '100%',
  textAlign: 'center',

  paddingBottom: 6,
  borderBottom: '1px solid #5EB1EF',
});

export default { Card, CardHeader };
