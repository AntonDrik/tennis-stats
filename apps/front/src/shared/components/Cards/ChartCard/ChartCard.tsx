import { Box, Flex, Heading } from '@radix-ui/themes';
import React, { ReactElement } from 'react';
import { Spinner } from '../../index';

import './styles.scss';

interface IProps {
  isLoading: boolean;
  hasData: boolean;
  title: string | ReactElement;
  className?: string;
  children?: ReactElement | boolean | null;
}

function ChartCard(props: IProps) {
  const renderTitle = () => {
    if (typeof props.title === 'string') {
      return <Heading size={'3'}>{props.title}</Heading>;
    }

    return props.title;
  };

  return (
    <Flex direction={'column'} gap={'2'} className={props.className}>
      {renderTitle()}

      {props.isLoading && (
        <Box className={'spinner-container'}>
          <Spinner />
        </Box>
      )}

      {!props.hasData && !props.isLoading && (
        <Box className={'spinner-container'}>
          <Heading>Нет данных</Heading>
        </Box>
      )}

      {props.hasData && !props.isLoading && props.children}
    </Flex>
  );
}

export default ChartCard;
