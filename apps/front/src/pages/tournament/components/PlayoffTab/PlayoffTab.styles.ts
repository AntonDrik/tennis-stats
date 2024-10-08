import { Box, Flex } from '@radix-ui/themes';
import { styled } from 'styled-components';

const Container = styled(Box)({
  display: 'flex',
  minHeight: 400,
  overflow: 'auto',
});

const Column = styled(Flex)<{ $isLast: boolean }>(
  {
    position: 'relative',
    flexShrink: 0,
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'space-around',
    gap: 38,
    flex: 1,
  },
  ({ $isLast }) => ({
    marginRight: !$isLast ? 32 : 0,
  })
);

export default {
  Container,
  Column,
};
