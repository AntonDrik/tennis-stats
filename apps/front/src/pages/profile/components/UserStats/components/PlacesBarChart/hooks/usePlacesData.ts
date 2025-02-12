import { TPlacesStats } from '@tennis-stats/types';
import { useMemo } from 'react';

function usePlacesData(placesStats: TPlacesStats) {
  return useMemo(() => {
    if (!placesStats) {
      return [];
    }

    return Object.entries(placesStats).map(([key, value]) => ({ key, value }));
  }, [placesStats]);
}

export default usePlacesData;
