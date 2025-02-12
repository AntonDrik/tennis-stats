import React, { ReactElement } from 'react';
import { ScaleBand } from 'd3';
import { IExtendedDimensions } from '../../types/Dimensions';

type AxisBottomProps = {
  xScale: ScaleBand<string>;
  dimensions: IExtendedDimensions;
  valueFormatter?: (value: string) => string | ReactElement;
  lines?: boolean;
};

const TICK_LENGTH = 6;

function BandXAxis(props: AxisBottomProps) {
  const range = props.xScale.range();

  const BAR_WIDTH = props.xScale.bandwidth();
  const BAR_GAP = props.xScale.step() * props.xScale.paddingInner();
  const PAD = props.xScale.step() * props.xScale.paddingOuter() * 0.5 * 2;

  const XOffset = (i: number) => i * (BAR_WIDTH + BAR_GAP) + BAR_WIDTH / 2 + PAD;

  return (
    <g transform={`translate(0, ${props.dimensions.boundsHeight})`}>
      <path
        d={['M', range[0], 0, 'L', range[1], 0].join(' ')}
        fill="none"
        stroke="var(--slate-10)"
      />

      {props.xScale.domain().map((value, i) => (
        <g key={`bandXaxis-${i}`} transform={`translate(${XOffset(i)}, 0)`}>
          <line y2={TICK_LENGTH} stroke="var(--slate-10)" />

          <text
            fill={'var(--slate-12)'}
            textRendering={'optimizeLegibility'}
            style={{
              fontSize: '10px',
              textAnchor: 'middle',
              transform: 'translateY(20px)',
            }}
          >
            {props.valueFormatter ? props.valueFormatter(value) : value}
          </text>
        </g>
      ))}
    </g>
  );
}

export default BandXAxis;
