import React, { useState } from 'react';
import { Flex, SegmentedControl } from '@radix-ui/themes';
import { ITabContentProps } from '../../types/tab-props';

import CommonTab from './containers/CommonTab/CommonTab';

type TControl = 'common' | 'pairs';

function UserStats(props: ITabContentProps) {
  const [selectedTab, setSelectedTab] = useState<TControl>('common');

  const handleClickControl = (tab: TControl) => {
    return () => setSelectedTab(tab);
  };

  return (
    <Flex direction="column">
      <SegmentedControl.Root defaultValue={'common'} style={{ width: '100%' }}>
        <SegmentedControl.Item value="common" onClick={handleClickControl('common')}>
          Общая
        </SegmentedControl.Item>

        <SegmentedControl.Item value="pairs" onClick={handleClickControl('pairs')}>
          Парная
        </SegmentedControl.Item>
      </SegmentedControl.Root>

      <Flex gap={'5'} mt={'4'} justify={'center'} direction={'column'}>
        {selectedTab === 'common' && <CommonTab user={props.user} />}
      </Flex>
    </Flex>
  );
}

export default UserStats;
