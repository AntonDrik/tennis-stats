import { Box } from '@radix-ui/themes';
import styled from 'styled-components';

interface IMatchProps {
  $roundNumber: number;
  $isLast: boolean;
  $isFirst: boolean;
}

const GridBrick = styled(Box)<IMatchProps>({
  position: 'relative',
});

const AfterLine = styled(Box)({
  position: 'absolute',
  top: '50%',
  transform: 'translateY(50%)',
  right: -15,
  marginTop: -2,
  width: 19,
  height: 2,
  backgroundColor: 'var(--blue-7)',
});

const BeforeLine = styled(Box)({
  position: 'absolute',
  top: '50%',
  transform: 'translateY(50%)',
  marginTop: -2,
  left: -17,
  height: 2,
  width: 17,
  display: 'block',
  backgroundColor: 'var(--blue-7)',
});

const AfterLineVertical = styled(Box)<{
  $roundNumber: number;
  $matchNumber: number;
}>(
  {
    position: 'absolute',
    right: -17,
    width: 2,
    backgroundColor: 'var(--blue-7)',
  },
  ({ $roundNumber, $matchNumber }) => ({
    ...($matchNumber % 2 !== 0 ? { top: 35 } : {}),
    ...($matchNumber % 2 === 0 ? { bottom: 35 } : {}),
    height: `calc(55px * ${
      $roundNumber % 2 === 0 ? $roundNumber * $roundNumber : $roundNumber * 2
    })`,
  })
);

export default {
  GridBrick,
  AfterLine,
  BeforeLine,
  AfterLineVertical,
};
