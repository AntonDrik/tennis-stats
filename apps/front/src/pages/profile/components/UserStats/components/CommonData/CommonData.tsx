import React, { memo, useMemo } from 'react';
import { IUserCommonStats } from '@tennis-stats/types';
import { DataCard, IDataItem } from '../../../../../../shared/components';

interface IProps {
  stats: IUserCommonStats | undefined;
  isLoading: boolean;
}

function CommonData(props: IProps) {
  const items: IDataItem[] = useMemo(() => {
    if (!props.stats) {
      return [];
    }

    const { winPercent, allTournamentsCount, playedTournamentsCount, playedMatchesCount } =
      props.stats;

    return [
      {
        title: 'Процент побед',
        value: winPercent !== null ? `${props.stats.winPercent}%` : '-',
      },
      {
        title: 'Сыграно турниров',
        value: `${playedTournamentsCount} из ${allTournamentsCount}`,
      },
      {
        title: 'Сыграно матчей',
        value: playedMatchesCount,
      },
    ];
  }, [props.stats]);

  return (
    <DataCard items={items} label={'Общие данные'} isLoading={props.isLoading} minHeight={96} />
  );
}

export default memo(CommonData);
