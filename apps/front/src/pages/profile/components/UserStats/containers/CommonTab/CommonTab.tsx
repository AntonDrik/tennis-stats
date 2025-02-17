import { Flex } from '@radix-ui/themes';
import { isEmptyObject } from '@tennis-stats/helpers';
import React from 'react';
import { useUserCommonStatsQuery } from '../../../../../../core/api';
import { ChartCard } from '../../../../../../shared/components';
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
      <CommonData stats={commonStats.data} isLoading={commonStats.isLoading} />

      <RatingHistoryChart user={props.user} />

      <Flex className={'bar-charts-wrapper'} gap={'5'}>
        <ChartCard
          title={'Количество занятых мест'}
          hasData={!isEmptyObject(commonStats.data?.placesStats)}
          isLoading={commonStats.isLoading}
          className={'card-root'}
        >
          {commonStats.data && <PlacesBarChart placesStats={commonStats.data.placesStats} />}
        </ChartCard>

        <ChartCard
          title={'Количество игр в плей-офф'}
          hasData={Boolean(commonStats.data?.playedPlayoffsCount)}
          isLoading={commonStats.isLoading}
          className={'card-root'}
        >
          {commonStats.data?.playedPlayoffsCount && (
            <PlayoffsBarChart playoffsStats={commonStats.data.playedPlayoffsCount} />
          )}
        </ChartCard>
      </Flex>
    </Flex>
  );
}

export default CommonTab;
