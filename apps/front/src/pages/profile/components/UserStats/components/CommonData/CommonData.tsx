import { Box, Callout, Flex, Heading, Strong, Table, Text } from '@radix-ui/themes';
import React, { useMemo } from 'react';
import { useUserCommonStatsQuery } from '../../../../../../core/api';
import { Spinner } from '../../../../../../shared/components';
import { ITabContentProps } from '../../../../types/tab-props';

import './styles.scss';

const stageMap: Record<string, string> = {
  '1/1': 'Финал',
  '1/2': 'Полуфинал',
};

const cellStyle: { style: React.CSSProperties } = {
  style: { verticalAlign: 'middle', whiteSpace: 'nowrap' },
};

function CommonData(props: ITabContentProps) {
  const commonStats = useUserCommonStatsQuery(props.user.id);

  const getMappedStageKey = (stage: string) => {
    return stageMap[stage] ? stageMap[stage] : stage;
  };

  const playoffTable = useMemo(() => {
    if (!commonStats.data) {
      return [];
    }

    return Object.entries(commonStats.data.playedPlayoffsCount)
      .map(([key, value]) => ({ key: getMappedStageKey(key), value }))
      .filter((data) => data.value);
  }, [commonStats.data]);

  const cellWidth = `${100 / playoffTable.length}%`;

  return (
    <Flex className={'common-data'} gap={'4'}>
      <Flex direction={'column'} gap={'2'} className={'card-root'}>
        <Heading size={'3'}>Общие данные</Heading>

        <Callout.Root className={'callout-root'} size={'1'} color={'gray'} variant={'soft'}>
          {commonStats.isLoading && <Spinner />}

          {commonStats.data && (
            <Flex direction={'column'} gap={'2'}>
              <Box className={'data-list'}>
                <Box className={'data-list__item'}>
                  <Text className={'data-list__title'} size={'2'} align={'right'}>
                    Процент побед:
                  </Text>
                  <Strong className={'data-list__value'}>{commonStats.data.winPercent}%</Strong>
                </Box>

                <Box className={'data-list__item'}>
                  <Text className={'data-list__title'} size={'2'} align={'right'}>
                    Сыграно турниров:
                  </Text>
                  <Strong className={'data-list__value'}>
                    {commonStats.data.playedTournamentsCount} из{' '}
                    {commonStats.data.allTournamentsCount}
                  </Strong>
                </Box>

                <Box className={'data-list__item'}>
                  <Text className={'data-list__title'} size={'2'} align={'right'}>
                    Сыграно матчей:
                  </Text>
                  <Strong className={'data-list__value'}>
                    {commonStats.data.playedMatchesCount}
                  </Strong>
                </Box>
              </Box>
            </Flex>
          )}
        </Callout.Root>
      </Flex>

      <Flex direction={'column'} gap={'2'} className={'card-root'}>
        <Heading size={'3'}>Количество игр в плей-офф</Heading>

        <Table.Root size={'1'} variant={'surface'}>
          <Table.Header>
            <Table.Row>
              {playoffTable.map(({ key }) => (
                <Table.ColumnHeaderCell
                  key={`header-${key}`}
                  align={'center'}
                  width={cellWidth}
                  {...cellStyle}
                >
                  {key}
                </Table.ColumnHeaderCell>
              ))}
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row>
              {playoffTable.map(({ value }) => (
                <Table.RowHeaderCell
                  key={`cell-${value}`}
                  align={'center'}
                  width={cellWidth}
                  {...cellStyle}
                >
                  {value}
                </Table.RowHeaderCell>
              ))}
            </Table.Row>
          </Table.Body>
        </Table.Root>
      </Flex>
    </Flex>
  );
}

export default CommonData;
