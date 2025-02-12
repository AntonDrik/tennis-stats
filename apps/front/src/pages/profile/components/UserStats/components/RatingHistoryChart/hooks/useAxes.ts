import { IRawUserRatingHistory } from '@tennis-stats/types';
import * as d3 from 'd3';
import { endOfYear } from 'date-fns';
import { useMemo } from 'react';
import { IExtendedDimensions, TAxes } from '../../../../../../../shared/components/Chart';

function useAxes(
  data: IRawUserRatingHistory[],
  year: string,
  dimensions: IExtendedDimensions
): TAxes<'timebased'> {
  const { boundsWidth, boundsHeight } = dimensions;

  const [yMin, yMax] = d3.extent(data, (d) => d.rating);

  const xScale = useMemo(() => {
    const date = new Date(year);

    return d3
      .scaleTime()
      .domain([date, endOfYear(date)])
      .range([0, boundsWidth]);
  }, [boundsWidth, year]);

  const yScale = useMemo(() => {
    return d3
      .scaleLinear()
      .domain([(yMin || 0) - 2, (yMax || 0) + 2])
      .nice()
      .range([boundsHeight, 0]);
  }, [yMin, yMax, boundsHeight]);

  return { xScale, yScale };
}

export default useAxes;
