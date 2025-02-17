import { TPlacesStats } from '@tennis-stats/types';
import React, { useRef } from 'react';
import { BandXAxis, useDimensions, YAxis } from '../../../../../../shared/components/Chart';
import useAxes from './hooks/useAxes';
import usePlacesData from './hooks/usePlacesData';

const PADDINGS = { top: 6, right: 0, left: 22, bottom: 34 };

interface IProps {
  placesStats: TPlacesStats;
}

function PlacesBarChart(props: IProps) {
  const data = usePlacesData(props.placesStats);

  const wrapperRef = useRef(null);
  const dimensions = useDimensions(wrapperRef, PADDINGS);

  const axes = useAxes(data, dimensions, 0.2);

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
          {axes.yScale && (
            <YAxis yScale={axes.yScale} dimensions={dimensions} ticksCount={4} lines />
          )}

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
                y={axes.yScale(item.value) - 8}
                opacity={0.3}
                fontSize={12}
                textAnchor={'middle'}
                dominantBaseline={'middle'}
                pointerEvents={'none'}
              >
                {item.value}
              </text>
            </g>
          ))}

          {axes.xScale && (
            <BandXAxis
              xScale={axes.xScale}
              dimensions={dimensions}
              valueFormatter={(value) => (
                <React.Fragment>
                  <tspan>{value}</tspan>
                  <tspan x={0} y={'1em'}>
                    место
                  </tspan>
                </React.Fragment>
              )}
            />
          )}
        </g>
      </svg>
    </div>
  );
}

export default PlacesBarChart;
