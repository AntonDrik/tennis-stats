import { Box, Button } from '@radix-ui/themes';
import styled from 'styled-components';

const LeaderboardContainer = styled(Box)<{ $isOpen: boolean }>(
  {
    overflow: 'hidden',
    transition: 'height 0.2s ease-in-out',
  },
  ({ $isOpen }) => ({
    height: $isOpen ? 300 : 40,
  })
);

const Arrow = styled(Box)<{ $isOpen: boolean }>(
  {
    display: 'flex',
    position: 'absolute',
    right: 10,
    transition: 'transform .2s ease',
  },
  ({ $isOpen }) => ({
    transform: `rotate(${$isOpen ? '180' : '0'}deg)`,
  })
);

const LeaderboardButton = styled(Button)<{ $isOpen: boolean }>({
  position: 'relative',
  width: '100%',
});

export default {
  LeaderboardContainer,
  LeaderboardButton,
  Arrow,
};
