import { Stack, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { styled } from 'styled-components';

const Container = styled(Stack)<{ $isOpened: boolean }>(
  {
    display: 'flex',

    backgroundColor: '#D5EFFF',
    borderRadius: 6,
    overflow: 'hidden',
    cursor: 'pointer',
    transition: 'height .2s ease-in-out',

    '&:hover': {
      backgroundColor: '#C2E5FF',
    },
  },
  ({ $isOpened }) => ({
    height: $isOpened ? '183px' : '72px',
  })
);

const Row = styled(Stack)({
  alignItems: 'center',
  paddingLeft: '12px',
});

const Username = styled(Typography)({
  flex: 1,
  whiteSpace: 'nowrap',
  marginRight: 12,
});

const ScoreContainer = styled(Stack)({
  '&:hover': {
    backgroundColor: '#8EC8F6',
  },
});

const MatchScore = styled(Box)<{ $isWin?: boolean }>(
  {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 35,
    height: 35,
    backgroundColor: '#8EC8F6',
  },
  ({ $isWin }) => ({
    backgroundColor: $isWin ? '#8ECEAA' : '#8EC8F6',
  })
);
const SetScore = styled(Box)<{ $isWin?: boolean }>(
  {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 35,
    height: 35,
  },
  ({ $isWin }) => ({
    '.MuiTypography-root': {
      fontWeight: $isWin ? 600 : 400,
    },
  })
);

const Divider = styled(Box)({
  height: 2,
  backgroundColor: '#fff',
  borderColor: '#fff',
});

export default {
  Container,
  Row,
  MatchScore,
  SetScore,
  ScoreContainer,
  Username,
  Divider,
};
