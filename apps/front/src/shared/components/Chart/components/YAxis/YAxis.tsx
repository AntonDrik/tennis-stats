import * as React from 'react';
import { ScaleLinear } from 'd3';
import { IExtendedDimensions } from '../../types/Dimensions';

type AxisLeftProps = {
  yScale: ScaleLinear<number, number>;
  dimensions: IExtendedDimensions;
  valueFormatter?: (value: number) => string;
  lines?: boolean;
  ticksCount?: number;
};

const TICK_LENGTH = 6;

function YAxis(props: AxisLeftProps) {
  const range = props.yScale.range();

  return (
    <g>
      <path
        d={['M', 0, range[0], 'L', 0, range[1]].join(' ')}
        fill="none"
        stroke="var(--slate-10)"
      />

      {props.yScale.ticks(props.ticksCount ?? 7).map((value) => (
        <g key={`y-scale-${value}`} transform={`translate(0, ${props.yScale(value)})`}>
          <line x2={-TICK_LENGTH} stroke="var(--slate-10)" />

          {props.lines && (
            <line x1={0} x2={props.dimensions.boundsWidth} stroke="var(--slate-a3)" />
          )}

          <text
            key={value}
            fill={'var(--slate-12)'}
            textRendering={'optimizeLegibility'}
            style={{
              fontSize: '10px',
              textAnchor: 'end',
              transform: 'translate(-10px, 2px)',
            }}
          >
            {props.valueFormatter ? props.valueFormatter(value) : value}
          </text>
        </g>
      ))}
    </g>
  );
}

export default YAxis;
