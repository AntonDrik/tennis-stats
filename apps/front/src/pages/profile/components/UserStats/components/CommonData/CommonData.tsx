import React from 'react';
import { IUserCommonStats } from '@tennis-stats/types';
import { Box, Callout, Flex, Heading, Strong, Text } from '@radix-ui/themes';
import { Spinner } from '../../../../../../shared/components';

import './styles.scss';

interface IProps {
  stats: IUserCommonStats | undefined;
  isLoading: boolean;
}

function CommonData(props: IProps) {
  return (
    <React.Fragment>
      <Heading size={'3'}>Общие данные</Heading>

      <Callout.Root className={'callout-root'} size={'1'} color={'gray'} variant={'soft'}>
        {props.isLoading && <Spinner />}

        {props.stats && (
          <Flex direction={'column'} gap={'2'}>
            <Box className={'data-list'}>
              <Box className={'data-list__item'}>
                <Text className={'data-list__title'} size={'2'} align={'right'}>
                  Процент побед:
                </Text>

                <Strong className={'data-list__value'}>{props.stats.winPercent}%</Strong>
              </Box>

              <Box className={'data-list__item'}>
                <Text className={'data-list__title'} size={'2'} align={'right'}>
                  Сыграно турниров:
                </Text>

                <Strong className={'data-list__value'}>
                  {props.stats.playedTournamentsCount} из {props.stats.allTournamentsCount}
                </Strong>
              </Box>

              <Box className={'data-list__item'}>
                <Text className={'data-list__title'} size={'2'} align={'right'}>
                  Сыграно матчей:
                </Text>

                <Strong className={'data-list__value'}>{props.stats.playedMatchesCount}</Strong>
              </Box>
            </Box>
          </Flex>
        )}
      </Callout.Root>
    </React.Fragment>
  );
}

export default CommonData;
