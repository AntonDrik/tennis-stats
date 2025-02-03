import * as d3 from 'd3';
import { ReactElement, RefObject, useEffect, useMemo } from 'react';
import { useDimensions } from '../hook/useDimensions';
import { XAxis } from '../XAxis/XAxis';
import { YAxis } from '../YAxis/YAxis';

const MARGIN = { top: 30, right: 30, bottom: 50, left: 50 };
const HEIGHT = 300;

type AxisBasicProps = {
  parentRef: RefObject<HTMLDivElement>;
  XScaleTime: d3.ScaleTime<number, number>;
  YScaleLinear: d3.ScaleLinear<number, number>;
  children?: ReactElement;
};

export const ChartContainer = (props: AxisBasicProps) => {
  const { width } = useDimensions(props.parentRef);

  const boundsWidth = width - MARGIN.right - MARGIN.left;
  const boundsHeight = HEIGHT - MARGIN.top - MARGIN.bottom;

  const xScale = useMemo(
    () => props.XScaleTime?.range([0, boundsWidth]),
    [props.XScaleTime, boundsWidth]
  );
  const yScale = useMemo(
    () => props.YScaleLinear?.range([boundsHeight, 0]),
    [props.YScaleLinear, boundsHeight]
  );

  return (
    <div>
      <svg width={width} height={HEIGHT} shapeRendering={'crispEdges'}>
        <g
          width={boundsWidth}
          height={boundsHeight}
          transform={`translate(${[MARGIN.left, MARGIN.top].join(',')})`}
        >
          {/* graph content */}
          {props.children}
        </g>

        <g
          width={boundsWidth}
          height={boundsHeight}
          transform={`translate(${[MARGIN.left, MARGIN.top].join(',')})`}
          overflow={'visible'}
        >
          {/* Y axis */}
          {yScale && <YAxis yScale={yScale} pixelsPerTick={30} />}

          {/* X axis, use an additional translation to appear at the bottom */}
          {xScale && (
            <g transform={`translate(0, ${boundsHeight})`}>
              <XAxis xScale={xScale} pixelsPerTick={60} />
            </g>
          )}
        </g>
      </svg>
    </div>
  );
};
