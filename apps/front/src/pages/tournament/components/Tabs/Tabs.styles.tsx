import { Tabs as RadixTabTrigger } from '@radix-ui/themes';
import styled from 'styled-components';

const PlayoffTab = styled(RadixTabTrigger.Trigger)`
  .rt-BaseTabListTriggerInner {
    background-color: var(--purple-4);
  }

  .rt-BaseTabListTriggerInner:where(:hover) {
    background-color: var(--purple-6);
  }
`;

export default {
  PlayoffTab,
};
