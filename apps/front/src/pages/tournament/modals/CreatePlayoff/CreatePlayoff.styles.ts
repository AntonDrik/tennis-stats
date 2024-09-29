import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
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

const Hint = styled(Typography)({
  position: 'absolute',
  bottom: 1,
  fontSize: 11,
  textTransform: 'lowercase',
  opacity: 0.7,
});

const Arrow = styled(KeyboardArrowUpIcon)<{ $isOpen: boolean }>(
  {
    position: 'absolute',
    right: 10,
    transition: 'transform .2s ease',
  },
  ({ $isOpen }) => ({
    transform: `rotate(${$isOpen ? '180' : '0'}deg)`,
  })
);

const LeaderboardButton = styled(Button)<{ $isOpen: boolean }>(
  {},
  ({ $isOpen }) => ({})
);

export default {
  LeaderboardContainer,
  LeaderboardButton,
  Hint,
  Arrow,
};
