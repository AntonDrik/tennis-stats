import { Stack } from '@mui/material';
import styled from 'styled-components';
import { device } from '../../../../theme/media-queries';

const TourRow = styled(Stack)({
  alignItems: 'center',
  flexDirection: 'row',
  gap: 16,

  [`@media ${device.tablet}`]: {
    flexDirection: 'column',
  },
});

export default {
  TourRow,
};
