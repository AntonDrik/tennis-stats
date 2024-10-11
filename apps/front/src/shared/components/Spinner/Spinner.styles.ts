import { Flex } from '@radix-ui/themes';
import styled, { keyframes } from 'styled-components';

const Wrapper = styled(Flex)({
  position: 'absolute',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '100%',
  zIndex: 1200,
  backgroundColor: 'var(--gray-a4)',
});

const PageWrapper = styled(Wrapper)(() => ({
  left: 0,
  right: 0,
  top: 0,
  transform: 'none',
  backgroundColor: 'var(--sage-a3)',
  backdropFilter: 'blur(3px)',
}));

const rotation = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`;

const Loader = styled.div`
  width: 48px;
  height: 48px;
  border: 5px solid #fff;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: ${rotation} 1s linear infinite;
`;

export default {
  Wrapper,
  PageWrapper,
  Loader,
};
