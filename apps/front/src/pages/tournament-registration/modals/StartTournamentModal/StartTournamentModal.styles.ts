import { Flex } from '@radix-ui/themes';
import styled from 'styled-components';

const TourRow = styled(Flex)({
  alignItems: 'flex-end',

  [`@media only screen and (max-width : 576px)`]: {
    flexDirection: 'column',
    alignItems: 'center',
  },
});

export default {
  TourRow,
};
