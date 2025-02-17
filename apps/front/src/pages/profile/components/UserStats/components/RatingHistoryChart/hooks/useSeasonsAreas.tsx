import { ISeason } from '@tennis-stats/types';
import { useMemo } from 'react';
import { IExtendedDimensions, TAxes } from '../../../../../../../shared/components/Chart';

function useSeasonsAreas(
  seasons: ISeason[],
  axes: TAxes<'timebased'>,
  dimensions: IExtendedDimensions
) {
  const colors = ['--blue-a3', '--purple-a3', '--grass-a3', '--orange-a3'];
  const { xScale } = axes;

  return useMemo(() => {
    return seasons.map((season, index) => {
      const isNotLast = seasons.length !== index + 1;

      const width = xScale(season.endDate) - xScale(season.startDate) - 2 * Number(isNotLast);

      if (width < 0) {
        return null;
      }

      return (
        <g key={`season-area-${season.startDate}`}>
          <rect
            x={xScale(season.startDate)}
            y={0}
            width={width}
            height={dimensions.boundsHeight}
            fill={`var(${colors[index] ?? '--gray-a3'})`}
          ></rect>

          {/*<text*/}
          {/*  x={xScale(season.startDate) + width / 2}*/}
          {/*  y={11}*/}
          {/*  style={{ opacity: 0.3 }}*/}
          {/*  textAnchor={'middle'}*/}
          {/*  dominantBaseline={'middle'}*/}
          {/*  pointerEvents={'none'}*/}
          {/*>*/}
          {/*  #{index + 1}*/}
          {/*</text>*/}
        </g>
      );
    });
  }, [seasons, xScale, dimensions.boundsHeight]);
}

export default useSeasonsAreas;
