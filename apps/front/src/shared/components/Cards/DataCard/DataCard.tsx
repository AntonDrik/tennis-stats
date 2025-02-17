import { Box, Callout, Flex, Heading, Strong, Text } from '@radix-ui/themes';
import React from 'react';
import { Spinner } from '../../index';

import './styles.scss';
import { IDataItem } from './DataCard.types';

interface IProps {
  items: IDataItem[];
  label?: string;
  isLoading?: boolean;
  minHeight?: number;
}

function DataCard(props: IProps) {
  return (
    <Flex direction={'column'} gap={'2'}>
      <Heading size={'3'}>{props.label}</Heading>

      <Callout.Root
        className={'callout-root'}
        size={'1'}
        color={'gray'}
        variant={'soft'}
        style={{ minHeight: props.minHeight }}
      >
        {props.isLoading && <Spinner />}

        {props.items.length > 0 && (
          <Flex direction={'column'} gap={'2'}>
            <Box className={'data-list'}>
              {props.items.map((item) => (
                <Box key={`data-card-item-${item.title}`} className={'data-list__item'}>
                  <Text
                    className={'data-list__title'}
                    size={'2'}
                    align={'right'}
                    style={{ lineHeight: '22px' }}
                  >
                    {item.title}:
                  </Text>

                  <Strong className={'data-list__value'}>{item.value}</Strong>
                </Box>
              ))}
            </Box>
          </Flex>
        )}
      </Callout.Root>
    </Flex>
  );
}

export default DataCard;
