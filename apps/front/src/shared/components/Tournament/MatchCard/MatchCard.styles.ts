import { Text, Flex } from '@radix-ui/themes';
import { styled } from 'styled-components';

type TContainerProps = {
  $isOpened: boolean;
  $readOnly: boolean;
  $highlight: boolean;
};

const Container = styled(Flex)<TContainerProps>(
  {
    display: 'flex',
    flexDirection: 'column',

    backgroundColor: 'var(--sage-3)',
    borderRadius: 'var(--radius-3)',
    overflow: 'hidden',
    transition: 'height .2s ease-in-out',
  },
  ({ $isOpened, $readOnly, $highlight }) => ({
    height: $isOpened ? '160px' : '92px',
    cursor: $readOnly ? 'default' : 'pointer',

    border: $highlight ? '2px solid var(--orange-9)' : 'none',
    boxSizing: $highlight ? 'content-box' : 'initial',

    '&:hover': {
      backgroundColor: $readOnly ? 'var(--sage-3)' : 'var(--sage-4)',
    },
  })
);

const Row = styled(Flex)({
  alignItems: 'center',
  paddingLeft: '12px',
});

const Username = styled(Text)({
  flex: 1,
  whiteSpace: 'nowrap',
  marginRight: 12,
  color: 'var(--sage-12)',
});

const ScoreContainer = styled(Flex)({
  flexDirection: 'column',

  '&:hover': {
    backgroundColor: 'var(--sage-7)',
  },
});

const MatchScore = styled(Flex)<{ $isWin?: boolean }>(
  {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    width: 45,
    height: 45,
  },
  ({ $isWin }) => ({
    backgroundColor: $isWin ? 'var(--grass-6)' : 'var(--blue-6)',
  })
);

const SetScore = styled(Flex)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  width: 45,
  height: 45,
});

const Divider = styled(Flex)<{ $isPlayoffCard: boolean | unknown }>(
  {
    flexDirection: 'column',
    backgroundColor: 'var(--sage-7)',
  },
  ({ $isPlayoffCard }) => ({
    height: $isPlayoffCard ? 2 : 1,
  })
);

const TextMeduim = styled(Text)({
  color: 'var(--sage-12)',
});

export default {
  Container,
  Row,
  MatchScore,
  SetScore,
  ScoreContainer,
  Username,
  Divider,
  TextMeduim,
};
