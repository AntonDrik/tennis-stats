import { IRatingHistory, ISeason } from '@tennis-stats/types';
import * as d3 from 'd3';
import { endOfYear } from 'date-fns';
import { parseISO } from 'date-fns/parseISO';
import { useMemo, useRef } from 'react';
import { useDimensions, XAxis, YAxis } from '../../../../../../shared/components/Chart';

// const stageMap: Record<string, string> = {
//   '1/1': 'Финал',
//   '1/2': 'Полуфинал',
// };

const MARGIN = { top: 10, right: 0, left: 34, bottom: 24 };
const HEIGHT = 250;

interface IProps {
  ratingHistory: IRatingHistory[];
  year: string;
  seasons: ISeason[];
}

function RatingHistoryChart(props: IProps) {
  const wrapperRef = useRef(null);

  const { width } = useDimensions(wrapperRef);

  const boundsWidth = width - MARGIN.right - MARGIN.left;
  const boundsHeight = HEIGHT - MARGIN.top - MARGIN.bottom;

  const data = props.ratingHistory ?? [];

  const [yMin, yMax] = d3.extent(data, (d) => d.rating);

  const xScale = useMemo(() => {
    return d3
      .scaleTime()
      .domain([new Date(props.year), endOfYear(new Date(props.year))])
      .range([0, boundsWidth]);
  }, [boundsWidth, data]);

  const yScale = useMemo(() => {
    return d3
      .scaleLinear()
      .domain([yMin || 0, (yMax || 0) + 5])
      .nice()
      .range([boundsHeight, 0]);
  }, [yMax, boundsHeight, data]);

  const lineBuilder = d3
    .line<IRatingHistory>()
    .x((d) => xScale(parseISO(d.date as unknown as string)))
    .y((d) => yScale(d.rating))
    .curve(d3.curveCardinal.tension(0.5));

  const linePath = lineBuilder(data);

  const colors = ['--grass-a3', '--blue-a3', '--purple-a3', '--red-a3', '--orange-a3'];

  const rects = props.seasons.map((season, index) => {
    const width = xScale(season.endDate) - xScale(season.startDate) - 2;

    return (
      <g>
        <rect
          x={xScale(season.startDate)}
          y={0}
          width={width}
          height={boundsHeight}
          fill={`var(${colors[index]})`}
        ></rect>

        <text
          x={xScale(season.startDate) + width / 2}
          y={15}
          style={{ opacity: 0.3 }}
          textAnchor={'middle'}
          dominantBaseline={'middle'}
        >
          #{index + 1}
        </text>
      </g>
    );
  });

  if (!linePath) {
    return null;
  }

  return (
    <div>
      <div ref={wrapperRef}>
        <svg width={width} height={HEIGHT} shapeRendering={'crispEdges'}>
          <g
            width={boundsWidth}
            height={boundsHeight}
            transform={`translate(${[MARGIN.left, MARGIN.top].join(',')})`}
            overflow={'visible'}
          >
            <path
              d={linePath}
              stroke="var(--accent-10)"
              fill="none"
              strokeWidth={2}
              shapeRendering="geometricPrecision"
            />

            {rects}

            {yScale && <YAxis yScale={yScale} pixelsPerTick={30} />}

            {xScale && (
              <g transform={`translate(0, ${boundsHeight})`}>
                <XAxis
                  xScale={xScale}
                  pixelsPerTick={30}
                  nice={{ active: true, removeLast: true }}
                />
              </g>
            )}
          </g>
        </svg>
      </div>
    </div>
  );
}

export default RatingHistoryChart;
