import * as d3 from 'd3';
import { PointerEvent, TouchEvent, useRef, useState } from 'react';
import { TAxes } from '../index';
import { IChartTooltip } from '../types/Tooltip';

interface ITooltipProps<D> {
  x: number;
  y: number;
  data: D;
}

const LEFT_PADDING = 42;

function useTooltip<D>(data: D[], axes: TAxes<'timebased'>, xAccessor: keyof D): IChartTooltip<D> {
  const [props, setProps] = useState<ITooltipProps<D> | null>(null);
  const currIndex = useRef<number>(0);

  const bisect = d3.bisector((d: D) => d[xAccessor]).center;

  const pointerMoved = (event: PointerEvent<SVGElement>) => {
    const coords = d3.pointer(event);

    const xCord = coords[0] - LEFT_PADDING;
    const value = axes.xScale.invert(xCord);
    const index = bisect(data, value as any);

    if (currIndex.current !== index) {
      setProps({
        x: axes.xScale(data[index][xAccessor] as any),
        y: coords[1],
        data: data[index],
      });
    }

    currIndex.current = index;
  };

  const pointerLeft = () => setProps(null);

  const touchStart = (event: TouchEvent<SVGElement>) => event.preventDefault();

  return {
    svgEvents: {
      onPointerEnter: pointerMoved,
      onPointerMove: pointerMoved,
      onPointerLeave: pointerLeft,
      onTouchStart: touchStart,
    },
    props,
  };
}

export default useTooltip;
