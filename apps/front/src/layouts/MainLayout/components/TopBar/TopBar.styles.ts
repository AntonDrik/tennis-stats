import styled from 'styled-components';

const Wrapper = styled.div<{ $isFixed: boolean }>(
  {
    backgroundColor: 'var(--sage-2)',
    zIndex: 1003,
    borderBottom: '1px solid var(--sage-6)',

    position: 'sticky',
    top: 0,

    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,

    padding: 8,
    paddingLeft: 'var(--space-4)',
    paddingRight: 'var(--space-4)',
  },
  ({ $isFixed }) => ({
    ...($isFixed
      ? {
          position: 'fixed',
          left: 0,
          right: 0,
          backgroundColor: 'rgba(var(--sage-2), 0.8)',
          backdropFilter: 'blur(40px)',
        }
      : {}),
  })
);

export default {
  Wrapper,
};
