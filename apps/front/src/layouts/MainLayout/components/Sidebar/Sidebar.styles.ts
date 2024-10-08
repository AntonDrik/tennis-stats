import { Box } from '@radix-ui/themes';
import styled from 'styled-components';

interface IMenuWrapperProps {
  $isOpen: boolean;
}

const SIDEBAR_WIDTH = 250;

const FixedMenuWrapper = styled(Box)<IMenuWrapperProps>(
  {
    position: 'fixed',
    top: 57,
    width: SIDEBAR_WIDTH,
    height: 'calc(100vh - 57px)',
    backgroundColor: 'var(--sage-2)',
    zIndex: 1002,
    transition: '.3s',
  },
  ({ $isOpen }) => ({
    left: $isOpen ? 0 : -SIDEBAR_WIDTH,
    paddingLeft: $isOpen ? '0.5rem' : 0,
    paddingRight: $isOpen ? '0.5rem' : 0,
    visibility: $isOpen ? 'visible' : 'hidden',
  })
);

const VisibleMenuWrapper = styled(Box)({
  position: 'fixed',
  top: 57,
  width: SIDEBAR_WIDTH,
  height: 'calc(100vh - 57px)',
  backgroundColor: 'var(--sage-2)',
  paddingLeft: '0.5rem',
  paddingRight: '0.5rem',
  zIndex: 1002,
});

const Backdrop = styled(Box)<IMenuWrapperProps>(
  {
    position: 'fixed',
    top: 57,
    left: 250,
    right: 0,
    bottom: 0,
    backgroundColor: 'var(--black-a5)',
    zIndex: 1001,
    transition: 'opacity .3s',
  },
  ({ $isOpen }) => ({
    visibility: $isOpen ? 'visible' : 'hidden',
    opacity: $isOpen ? 1 : 0,
  })
);

export default {
  FixedMenuWrapper,
  VisibleMenuWrapper,
  Backdrop,
};
