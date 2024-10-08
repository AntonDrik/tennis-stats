import { Flex } from '@radix-ui/themes';
import styled from 'styled-components';
import { device } from '../../../../theme/media-queries';

const TourRow = styled(Flex)({
  alignItems: 'flex-end',

  [`@media ${device.tablet}`]: {
    flexDirection: 'column',
    alignItems: 'center',
  },
});

export default {
  TourRow,
};
