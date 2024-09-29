import { Box, Backdrop as MuiBackdrop } from '@mui/material';
import styled from 'styled-components';
import theme from '../../../../theme/theme';

interface IMenuWrapperProps {
  $isOpen: boolean;
  width: number;
}

const MenuWrapper = styled(Box)<IMenuWrapperProps>(
  {
    transition: '.3s',
    position: 'absolute',
    height: '100%',
    backgroundColor: '#F7F9F8',
    zIndex: 999,
  },
  ({ $isOpen, width }) => ({
    width,
    left: $isOpen ? 0 : -width,
    paddingLeft: $isOpen ? '0.5rem' : 0,
    paddingRight: $isOpen ? '0.5rem' : 0,
  })
);

const Backdrop = styled(MuiBackdrop)({
  zIndex: theme.zIndex.drawer + 1,
  marginTop: '55px',
});

export default {
  MenuWrapper,
  Backdrop,
};
