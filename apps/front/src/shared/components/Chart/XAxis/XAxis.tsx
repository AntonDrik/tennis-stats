import { format } from 'date-fns/format';
import { ru } from 'date-fns/locale';
import { useMemo } from 'react';
import { ScaleTime } from 'd3';

type AxisBottomProps = {
  xScale: ScaleTime<number, number>;
  pixelsPerTick: number;
  nice?: {
    active: boolean;
    removeLast?: boolean;
  };
};

// tick length
const TICK_LENGTH = 6;

export const XAxis = (props: AxisBottomProps) => {
  const range = props.xScale.range();

  const mapTicks = (value: Date) => ({
    value: format(value, 'MMM', { locale: ru }),
    xOffset: props.xScale(value),
  });

  const ticks = useMemo(() => {
    let xScale = props.xScale;

    if (props.nice?.active) {
      xScale = xScale.nice();
    }

    const ticks = xScale.ticks().map(mapTicks);

    if (props.nice?.removeLast) {
      ticks.pop();
    }

    return ticks;
  }, [props.xScale, range]);

  return (
    <>
      {/* Main horizontal line */}
      <path d={['M', range[0], 0, 'L', range[1], 0].join(' ')} fill="none" stroke="currentColor" />

      {/* Ticks and labels */}
      {ticks.map(({ value, xOffset }) => (
        <g key={value.valueOf()} transform={`translate(${xOffset}, 0)`}>
          <line y2={TICK_LENGTH} stroke="currentColor" />
          <text
            key={value.valueOf()}
            style={{
              fontSize: '10px',
              textAnchor: 'middle',
              transform: 'translateY(20px)',
            }}
          >
            {value}
          </text>
        </g>
      ))}
    </>
  );
};
