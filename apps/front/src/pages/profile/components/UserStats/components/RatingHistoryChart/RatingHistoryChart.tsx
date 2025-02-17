import { Flex, Heading } from '@radix-ui/themes';
import { getYear } from 'date-fns/getYear';
import React, { useEffect, useState } from 'react';
import { useGetSeasonsQuery, useGetUserRatingHistoryQuery } from '../../../../../../core/api';
import ChartCard from '../../../../../../shared/components/Cards/ChartCard/ChartCard';
import { ITabContentProps } from '../../../../types/tab-props';
import RatingChart from './component/Chart/RatingChart';
import YearSelect from './component/YearSelect/YearSelect';

import './styles.scss';

function RatingHistoryChart(props: ITabContentProps) {
  const [selectedYear, setSelectedYear] = useState(getYear(new Date()).toString());

  const seasons = useGetSeasonsQuery({ year: selectedYear });
  const ratingHistory = useGetUserRatingHistoryQuery(props.user.id, selectedYear);

  const seasonsList = seasons.data ?? [];

  const hasData = (ratingHistory.data?.list ?? []).length > 0;
  const isLoading = ratingHistory.isLoading || seasons.isLoading;

  useEffect(() => {
    void ratingHistory.refetch();
    void seasons.refetch();
  }, [selectedYear]);

  return (
    <ChartCard
      title={
        <Flex align={'end'} gap={'2'}>
          <Heading size={'3'}>История рейтинга</Heading>
          <YearSelect value={selectedYear} onChange={setSelectedYear} />
        </Flex>
      }
      isLoading={isLoading}
      hasData={hasData}
    >
      {ratingHistory.data && (
        <RatingChart
          ratingData={ratingHistory.data}
          seasonsList={seasonsList}
          selectedYear={selectedYear}
        />
      )}
    </ChartCard>
  );
}

export default RatingHistoryChart;
