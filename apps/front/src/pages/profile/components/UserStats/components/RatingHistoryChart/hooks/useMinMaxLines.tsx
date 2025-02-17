import { IRawMinMaxUserRating } from '@tennis-stats/types';
import React, { useMemo } from 'react';
import { IExtendedDimensions, TAxes } from '../../../../../../../shared/components/Chart';

function useMinMaxLines(
  data: IRawMinMaxUserRating,
  axes: TAxes<'timebased'>,
  dimensions: IExtendedDimensions
) {
  const minLine = useMemo(() => {
    const y = axes.yScale(data.min);

    return (
      <g>
        <line x1={0} y1={y} x2={dimensions.boundsWidth} y2={y} stroke="var(--red-9)" />

        <text
          x={dimensions.boundsWidth - 60}
          y={y + 10}
          opacity={0.3}
          fontSize={9}
          textAnchor={'middle'}
          dominantBaseline={'middle'}
          pointerEvents={'none'}
        >
          Мин. рейтинг ({data.min})
        </text>
      </g>
    );
  }, [axes, data.min, dimensions.boundsWidth]);

  const maxLine = useMemo(() => {
    const y = axes.yScale(data.max);

    return (
      <g>
        <line x1={0} y1={y} x2={dimensions.boundsWidth} y2={y} stroke="var(--red-9)" />

        <text
          x={dimensions.boundsWidth - 60}
          y={y - 10}
          opacity={0.3}
          fontSize={9}
          textAnchor={'middle'}
          dominantBaseline={'middle'}
          pointerEvents={'none'}
        >
          Макс. рейтинг ({data.max})
        </text>
      </g>
    );
  }, [axes, data.max, dimensions.boundsWidth]);

  return (
    <g>
      {minLine} {maxLine}
    </g>
  );
}

export default useMinMaxLines;
