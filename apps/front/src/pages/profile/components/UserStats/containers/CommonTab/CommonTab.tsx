import { Box, Flex, Heading } from '@radix-ui/themes';
import React from 'react';
import { useUserCommonStatsQuery } from '../../../../../../core/api';
import { Spinner } from '../../../../../../shared/components';
import { ITabContentProps } from '../../../../types/tab-props';
import CommonData from '../../components/CommonData/CommonData';
import PlacesBarChart from '../../components/PlacesBarChart/PlacesBarChart';
import PlayoffsBarChart from '../../components/PlayoffsBarChart/PlayoffsBarChart';

import './styles.scss';
import RatingHistoryChart from '../../components/RatingHistoryChart/RatingHistoryChart';

function CommonTab(props: ITabContentProps) {
  const commonStats = useUserCommonStatsQuery(props.user.id);

  return (
    <Flex direction={'column'} gap={'5'}>
      <Flex className={'common-data'} gap={'5'}>
        <Flex direction={'column'} gap={'2'} className={'card-root'}>
          <CommonData stats={commonStats.data} isLoading={commonStats.isLoading} />
        </Flex>

        <Flex direction={'column'} gap={'2'} className={'card-root'}>
          <Heading size={'3'}>Количество игр в плей-офф</Heading>

          {commonStats.isLoading && (
            <Box className={'spinner-container'}>
              <Spinner />
            </Box>
          )}

          {commonStats.data && !commonStats.isLoading && (
            <PlayoffsBarChart playoffsStats={commonStats.data.playedPlayoffsCount} />
          )}
        </Flex>
      </Flex>

      <Flex direction={'column'} gap={'2'} className={'card-root'}>
        <Heading size={'3'}>Количество занятых мест</Heading>

        {commonStats.isLoading && (
          <Box className={'spinner-container'}>
            <Spinner />
          </Box>
        )}

        {commonStats.data && !commonStats.isLoading && (
          <PlacesBarChart placesStats={commonStats.data.placesStats} />
        )}
      </Flex>

      <RatingHistoryChart user={props.user} />
    </Flex>
  );
}

export default CommonTab;
