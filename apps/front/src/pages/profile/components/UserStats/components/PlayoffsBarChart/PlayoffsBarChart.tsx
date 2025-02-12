import { TPlayedPlayoffsStats } from '@tennis-stats/types';
import React, { useRef } from 'react';
import { useDimensions, YAxis, BandXAxis } from '../../../../../../shared/components/Chart';
import useAxes from './hooks/useAxes';
import usePlayoffData from './hooks/usePlayoffData';

const PADDINGS = { top: 6, right: 0, left: 22, bottom: 24 };

interface IProps {
  playoffsStats: TPlayedPlayoffsStats;
}

function PlayoffsBarChart(props: IProps) {
  const data = usePlayoffData(props.playoffsStats);

  const wrapperRef = useRef(null);
  const dimensions = useDimensions(wrapperRef, PADDINGS);

  const axes = useAxes(data, dimensions, 0.4);

  const BAR_WIDTH = axes.xScale.bandwidth();

  return (
    <div className={'chart-container'} ref={wrapperRef} style={{ width: '100%', height: 250 }}>
      <svg
        width={dimensions.fullWidth}
        height={dimensions.fullHeight}
        viewBox={`0 0 ${dimensions.fullWidth} ${dimensions.fullHeight}`}
        style={{ touchAction: 'pan-y' }}
      >
        <g
          width={dimensions.boundsWidth}
          height={dimensions.boundsHeight}
          transform={`translate(${[PADDINGS.left, PADDINGS.top].join(',')})`}
        >
          {axes.yScale && <YAxis yScale={axes.yScale} dimensions={dimensions} lines />}

          {data.map((item, index) => (
            <g key={`bar-rect-${index}`}>
              <rect
                x={axes.xScale(item.key)}
                y={axes.yScale(item.value)}
                rx={5}
                fill={'var(--blue-6)'}
                height={axes.yScale(0) - axes.yScale(item.value)}
                width={BAR_WIDTH}
              ></rect>

              <text
                x={(axes.xScale(item.key) ?? 0) + BAR_WIDTH / 2}
                y={axes.yScale(item.value) - 10}
                opacity={0.5}
                textAnchor={'middle'}
                dominantBaseline={'middle'}
                pointerEvents={'none'}
              >
                {item.value}
              </text>
            </g>
          ))}

          {axes.xScale && <BandXAxis xScale={axes.xScale} dimensions={dimensions} />}
        </g>
      </svg>
    </div>
  );
}

export default PlayoffsBarChart;
