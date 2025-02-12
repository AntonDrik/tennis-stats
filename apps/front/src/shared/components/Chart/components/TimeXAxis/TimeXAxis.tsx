import { format } from 'date-fns/format';
import { ru } from 'date-fns/locale';
import React, { useMemo } from 'react';
import { ScaleTime } from 'd3';
import { IExtendedDimensions } from '../../types/Dimensions';

type AxisBottomProps = {
  xScale: ScaleTime<number, number>;
  dimensions: IExtendedDimensions;
  lines?: boolean;
  nice?: {
    removeLast?: boolean;
  };
};

const TICK_LENGTH = 6;

function TimeXAxis(props: AxisBottomProps) {
  const range = props.xScale.range();

  const mapTicks = (value: Date) => ({
    value: format(value, 'MMM', { locale: ru }),
    xOffset: props.xScale(value),
  });

  const ticks = useMemo(() => {
    let xScale = props.xScale;

    if (props.nice) {
      xScale = xScale.nice();
    }

    const ticks = xScale.ticks().map(mapTicks);

    if (props.nice?.removeLast) {
      ticks.pop();
    }

    return ticks;
  }, [props.xScale, range]);

  return (
    <g transform={`translate(0, ${props.dimensions.boundsHeight})`}>
      <path
        d={['M', range[0], 0, 'L', range[1], 0].join(' ')}
        fill="none"
        stroke="var(--slate-10)"
      />

      {ticks.map(({ value, xOffset }) => (
        <g key={value.valueOf()} transform={`translate(${xOffset}, 0)`}>
          <line y2={TICK_LENGTH} stroke="var(--slate-10)" />

          {props.lines && (
            <line y1={TICK_LENGTH} y2={-props.dimensions.boundsHeight} stroke="var(--slate-a3)" />
          )}

          <text
            key={value.valueOf()}
            fill={'var(--slate-12)'}
            textRendering={'optimizeLegibility'}
            style={{
              fontSize: '10px',
              textAnchor: 'middle',
              transform: 'translateY(20px) rotate(-20deg)',
            }}
          >
            {value}
          </text>
        </g>
      ))}
    </g>
  );
}

export default TimeXAxis;
