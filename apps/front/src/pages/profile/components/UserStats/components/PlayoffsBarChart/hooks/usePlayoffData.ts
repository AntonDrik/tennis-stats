import { TPlayedPlayoffsStats } from '@tennis-stats/types';
import { useMemo } from 'react';

const stages: Record<string, string> = {
  '1/1': 'Финал',
  '1/2': 'Полуфинал',
};

function usePlayoffData(playoffsStats: TPlayedPlayoffsStats) {
  return useMemo(() => {
    if (!playoffsStats) {
      return [];
    }

    return Object.entries(playoffsStats)
      .map(([key, value]) => ({ key: stages[key] ?? key, value }))
      .filter((data) => data.value);
  }, [playoffsStats]);
}

export default usePlayoffData;
