import { Button as RadixButton } from '@radix-ui/themes';
import styled from 'styled-components';

const Button = styled(RadixButton)({
  justifyContent: 'flex-start',
  height: '3rem',
  cursor: 'pointer',
  margin: 0,

  padding: '0 0.75rem',
});

export default {
  Button,
};
