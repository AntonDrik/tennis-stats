import styled from 'styled-components';

const Wrapper = styled.div({
  position: 'fixed',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  padding: 'var(--spacing-3)',
});

const Gradient = styled.div({
  height: '60vh',
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,

  background: 'linear-gradient(to bottom, var(--accent-4), transparent)',
});

export default {
  Wrapper,
  Gradient,
};
