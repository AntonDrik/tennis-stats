import styled from 'styled-components';

const Gradient = styled.div({
  height: '60vh',
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: -1,

  background: 'linear-gradient(to bottom, var(--accent-4), transparent)',
});

export default {
  Gradient,
};
