import { Flex } from '@radix-ui/themes';
import { IUser } from '@tennis-stats/types';
import React, { useEffect, useState } from 'react';
import { usePairStatsQuery } from '../../../../../../core/api';
import { ITabContentProps } from '../../../../types/tab-props';
import CommonPairsData from '../../components/CommonPairsData/CommonPairsData';
import OpponentSelect from '../../components/OpponentSelect/OpponentSelect';
import PairMatchesList from '../../components/PairMatchesList/PairMatchesList';

function PairsTab(props: ITabContentProps) {
  const [opponentUser, setOpponentUser] = useState<IUser | null>(null);

  const pairStats = usePairStatsQuery(props.user.id, opponentUser?.id);

  useEffect(() => {
    if (opponentUser?.id) {
      pairStats.refetch();
    }
  }, [opponentUser?.id]);

  return (
    <Flex direction={'column'} gap={'5'}>
      <OpponentSelect userId={props.user.id} onChange={setOpponentUser} />

      {opponentUser && (
        <Flex direction={'column'} gap={'5'}>
          <CommonPairsData stats={pairStats.data} isLoading={pairStats.isLoading} />

          <PairMatchesList matches={pairStats.data?.matches} />
        </Flex>
      )}
    </Flex>
  );
}

export default PairsTab;
