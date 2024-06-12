import { Box, Stack } from '@mui/material';
import styled from 'styled-components';

const Wrapper = styled(Stack)({
  display: 'flex',
  alignItems: 'center',
  backgroundColor: '#F7F9F8',
  borderRadius: 12,
  paddingTop: 8
});

const ButtonWrapper = styled(Box)<{ isOpen: boolean }>(
  {
    transition: 'height .5s ease',
    overflow: 'hidden'
  },
  ({ isOpen }) => ({
    height: isOpen ? 80 : 0
  })
);

export default {
  Wrapper,
  ButtonWrapper
};
