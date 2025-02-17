import { useAtom } from 'jotai';
import React from 'react';
import { Flex, SegmentedControl } from '@radix-ui/themes';
import { profileStatsActiveTabAtom, TControl } from '../../states/active-tab.state';
import { ITabContentProps } from '../../types/tab-props';

import CommonTab from './containers/CommonTab/CommonTab';
import PairsTab from './containers/PairsTab/PairsTab';

function UserStats(props: ITabContentProps) {
  const [activeTab, setActiveTab] = useAtom(profileStatsActiveTabAtom);

  const handleClickControl = (tab: TControl) => {
    return () => setActiveTab(tab);
  };

  return (
    <Flex direction="column">
      <SegmentedControl.Root value={activeTab} style={{ width: '100%' }}>
        <SegmentedControl.Item value="common" onClick={handleClickControl('common')}>
          Общая
        </SegmentedControl.Item>

        <SegmentedControl.Item value="pairs" onClick={handleClickControl('pairs')}>
          Парная
        </SegmentedControl.Item>
      </SegmentedControl.Root>

      <Flex gap={'5'} mt={'4'} justify={'center'} direction={'column'}>
        {activeTab === 'common' && <CommonTab user={props.user} />}

        {activeTab === 'pairs' && <PairsTab user={props.user} />}
      </Flex>
    </Flex>
  );
}

export default UserStats;
