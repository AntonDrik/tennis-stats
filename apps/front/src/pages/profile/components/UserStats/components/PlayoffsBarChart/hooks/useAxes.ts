import * as d3 from 'd3';
import { useMemo } from 'react';
import { IExtendedDimensions, TAxes } from '../../../../../../../shared/components/Chart';

function useAxes(
  data: { key: string; value: number }[],
  dimensions: IExtendedDimensions,
  xPadding = 0.4
): TAxes<'bandbased'> {
  const { boundsWidth, boundsHeight } = dimensions;

  const [_, yMax] = d3.extent(data, (d) => d.value);

  const xDomain = data.length < 3 ? ['1/4', 'Полуфинал', 'Финал'] : data.map((i) => i.key);

  const xScale = useMemo(() => {
    return d3.scaleBand().domain(xDomain).range([0, boundsWidth]).padding(xPadding);
  }, [boundsWidth, data, xPadding]);

  const yScale = useMemo(() => {
    return d3
      .scaleLinear()
      .domain([0, (yMax || 0) + 1])
      .nice()
      .range([boundsHeight, 0]);
  }, [yMax, boundsHeight]);

  return { xScale, yScale };
}

export default useAxes;
