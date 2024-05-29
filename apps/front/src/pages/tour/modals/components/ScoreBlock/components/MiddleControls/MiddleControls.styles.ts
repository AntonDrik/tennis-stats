import styled, { css, keyframes } from 'styled-components';
import CasinoIcon from '@mui/icons-material/Casino';

interface IRandomIconProps {
  $animate: boolean;
}

const a = keyframes({
  from: {
    transform: 'rotate(0deg)'
  },
  to: {
    transform: 'rotate(1800deg)'
  }
});

const RandomIconButton = styled(CasinoIcon)<IRandomIconProps>(
  {},
  ({ $animate }) => $animate && css`
      animation: ${a} 3s linear infinite;
      animation-timing-function: ease-out;
  `
);

export default {
  RandomIconButton
};
