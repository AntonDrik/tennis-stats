import * as d3 from 'd3';
import { useMemo } from 'react';
import { IExtendedDimensions, TAxes } from '../../../../../../../shared/components/Chart';

function useAxes(
  data: { key: string; value: number }[],
  dimensions: IExtendedDimensions,
  xPadding = 0.2
): TAxes<'bandbased'> {
  const { boundsWidth, boundsHeight } = dimensions;

  const [_y, yMax] = d3.extent(data, (d) => d.value);
  const [_x, xMax] = d3.extent(data, (d) => Number(d.key));

  const domain = useMemo(() => {
    return Array.from({ length: xMax ?? 0 }, (_, i) => i + 1).reverse();
  }, [xMax]);

  const xScale = useMemo(() => {
    return d3.scaleBand().domain(domain.map(String)).range([0, boundsWidth]).padding(xPadding);
  }, [boundsWidth, data, xPadding]);

  const yScale = useMemo(() => {
    return d3
      .scaleLinear()
      .domain([0, (yMax || 0) + 1])
      .range([boundsHeight, 0]);
  }, [yMax, boundsHeight]);

  return { xScale, yScale };
}

export default useAxes;
