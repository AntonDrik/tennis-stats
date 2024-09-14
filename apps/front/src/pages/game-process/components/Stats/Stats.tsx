import { Divider } from '@mui/material';
import { useAtomValue } from 'jotai';
import { useMemo } from 'react';
import useUpdateStatMutation from '../../../../core/api/matchApi/useUpdateStatMutation';
import { tourPageStateAtom } from '../../../../core/store';
import StatRecord from './component/StatRecord/StatRecord';
import Styled from './Stats.styles';

function Stats() {

  const tourPageState = useAtomValue(tourPageStateAtom);

  const updateStat = useUpdateStatMutation();

  const selectedMatch = tourPageState.selectedMatch;
  const stats = selectedMatch?.stats ?? [];

  const user1Stats = useMemo(() => {
    return stats.filter((stat) => stat.user.id === selectedMatch?.user1.id);
  }, [stats]);

  const user2Stats = useMemo(() => {
    return stats.filter((stat) => stat.user.id === selectedMatch?.user2.id);
  }, [stats]);

  return (
    <Styled.Wrapper direction={'row'} justifyContent={'space-evenly'}>

      <Styled.List gap={2} pr={2}>
        {
          user1Stats.map((stat) => (
            <StatRecord
              key={stat.id}
              name={stat.stat.name}
              value={stat.count}
              onChange={(value) => updateStat.mutate({ id: stat.id, value })}
            />
          ))
        }
      </Styled.List>

      <Divider
        orientation={'vertical'}
        variant='middle'
        sx={{ my: 0 }}
      />

      <Styled.List gap={2} pl={2}>
        {
          user2Stats.map((stat) => (
            <StatRecord
              key={stat.id}
              name={stat.stat.name}
              value={stat.count}
              onChange={(value) => updateStat.mutate({ id: stat.id, value })}
            />
          ))
        }
      </Styled.List>

    </Styled.Wrapper>
  );

}


export default Stats;
