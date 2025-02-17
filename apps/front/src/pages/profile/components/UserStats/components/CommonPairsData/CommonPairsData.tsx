import { IUserPairStats } from '@tennis-stats/types';
import React, { useMemo } from 'react';
import { DataCard, IDataItem } from '../../../../../../shared/components';
import { useEnumerableString } from '../../../../../../shared/hooks';

interface IProps {
  stats: IUserPairStats | undefined;
  isLoading: boolean;
}

function CommonPairsData(props: IProps) {
  const enumerable = useEnumerableString(['раз', 'раза', 'раз']);

  const items: IDataItem[] = useMemo(() => {
    if (!props.stats) {
      return [];
    }

    const { winPercent, playedToursCount, playedPlayoffsCount } = props.stats;

    return [
      {
        title: `Процент побед`,
        value: winPercent !== null ? `${winPercent}%` : `-`,
      },
      {
        title: 'Играли в турах',
        value: enumerable(playedToursCount),
      },
      {
        title: 'Играли в плейоффе',
        value: enumerable(playedPlayoffsCount),
      },
    ];
  }, [props.stats]);

  return (
    <DataCard
      label={'Общие данные пары'}
      items={items}
      isLoading={props.isLoading}
      minHeight={96}
    />
  );
}

export default CommonPairsData;
