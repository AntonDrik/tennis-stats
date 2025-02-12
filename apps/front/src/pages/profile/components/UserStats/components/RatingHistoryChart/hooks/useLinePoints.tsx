import { IRawUserRatingHistory } from '@tennis-stats/types';
import { useMemo } from 'react';
import { TAxes } from '../../../../../../../shared/components/Chart';

function useLinePoints(
  data: IRawUserRatingHistory[],
  axes: TAxes<'timebased'>,
  selected: IRawUserRatingHistory | undefined
) {
  const points = useMemo(() => {
    return data.map((item, index) => (
      <circle
        key={`line-point-${index}`}
        cx={axes.xScale(item.date)}
        cy={axes.yScale(item.rating)}
        r={selected?.id === item.id ? 5 : 3}
        fill={'var(--accent-11)'}
      ></circle>
    ));
  }, [data, axes.xScale, axes.yScale, selected]);

  return <g>{points}</g>;
}

export default useLinePoints;
