import { Box, Flex, Heading } from '@radix-ui/themes';
import { getYear } from 'date-fns/getYear';
import React, { useEffect, useState } from 'react';
import { useGetSeasonsQuery, useGetUserRatingHistoryQuery } from '../../../../../../core/api';
import { Spinner } from '../../../../../../shared/components';
import { ITabContentProps } from '../../../../types/tab-props';
import RatingChart from './component/Chart/RatingChart';
import YearSelect from './component/YearSelect/YearSelect';

import './styles.scss';

function RatingHistoryChart(props: ITabContentProps) {
  const [selectedYear, setSelectedYear] = useState(getYear(new Date()).toString());

  const seasons = useGetSeasonsQuery({ year: selectedYear });
  const ratingHistory = useGetUserRatingHistoryQuery(props.user.id, selectedYear);

  const ratingList = ratingHistory.data ?? [];
  const seasonsList = seasons.data ?? [];

  const hasData = ratingList.length > 0;
  const loading = ratingHistory.isLoading || seasons.isLoading;

  useEffect(() => {
    void ratingHistory.refetch();
    void seasons.refetch();
  }, [selectedYear]);

  return (
    <Flex direction={'column'} gap={'2'}>
      <Flex align={'center'} gap={'2'}>
        <Heading size={'3'}>История рейтинга</Heading>
        <YearSelect value={selectedYear} onChange={setSelectedYear} />
      </Flex>

      {loading && (
        <Box className={'spinner-container'}>
          <Spinner />
        </Box>
      )}

      {hasData && (
        <RatingChart
          ratingList={ratingList}
          seasonsList={seasonsList}
          selectedYear={selectedYear}
        />
      )}

      {!hasData && !loading && (
        <Box className={'spinner-container'}>
          <Heading>Нет данных</Heading>
        </Box>
      )}
    </Flex>
  );
}

export default RatingHistoryChart;
