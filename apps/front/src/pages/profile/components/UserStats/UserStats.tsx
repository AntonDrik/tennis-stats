import { Flex, SegmentedControl } from '@radix-ui/themes';
import { ESeasonStatus, ISeason } from '@tennis-stats/types';
import React, { useEffect, useState } from 'react';
import { useGetUserRatingHistoryQuery } from '../../../../core/api';
import useGetSeasonsQuery from '../../../../core/api/season/useGetSeasonsQuery';
import { ITabContentProps } from '../../types/tab-props';

import CommonData from './components/CommonData/CommonData';
import YearSelect from './components/RatingHistoryChart/component/YearSelect/YearSelect';
import RatingHistoryChart from './components/RatingHistoryChart/RatingHistoryChart';

function UserStats(props: ITabContentProps) {
  const [selectedYear, setSelectedYear] = useState('2024');

  const ratingHistory = useGetUserRatingHistoryQuery(props.user.id, selectedYear);

  const seasons = useGetSeasonsQuery({ year: selectedYear });

  const x: ISeason[] = [
    {
      id: 32,
      startDate: new Date(2024, 0, 1),
      endDate: new Date(2024, 2, 31),
      status: ESeasonStatus.FINISHED,
    },
    {
      id: 32,
      startDate: new Date(2024, 4, 1),
      endDate: new Date(2024, 7, 31),
      status: ESeasonStatus.FINISHED,
    },
    {
      id: 32,
      startDate: new Date(2024, 8, 1),
      endDate: new Date(2024, 11, 31),
      status: ESeasonStatus.FINISHED,
    },
    {
      id: 32,
      startDate: new Date(2024, 6, 1),
      endDate: new Date(2024, 9, 1),
      status: ESeasonStatus.FINISHED,
    },
  ];

  useEffect(() => {
    ratingHistory.refetch();
    seasons.refetch();
  }, [selectedYear]);

  return (
    <Flex direction="column">
      <SegmentedControl.Root defaultValue="inbox" style={{ width: '100%' }}>
        <SegmentedControl.Item value="inbox">Общая</SegmentedControl.Item>

        <SegmentedControl.Item value="drafts">Парная</SegmentedControl.Item>
      </SegmentedControl.Root>

      <Flex gap={'3'} mt={'4'} justify={'center'} direction={'column'}>
        <CommonData user={props.user} />

        <YearSelect onChange={setSelectedYear} />
        {ratingHistory.data && (
          <RatingHistoryChart
            ratingHistory={ratingHistory.data}
            year={selectedYear}
            seasons={[...x, ...(seasons.data ?? [])]}
          />
        )}
      </Flex>
    </Flex>
  );
}

export default UserStats;
