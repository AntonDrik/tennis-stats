import { PointerEventHandler, TouchEventHandler } from 'react';

interface ITooltipProps<D> {
  x: number;
  y: number;
  data: D;
}

interface IChartTooltip<D> {
  svgEvents: {
    onPointerEnter: PointerEventHandler<SVGElement>;
    onPointerMove: PointerEventHandler<SVGElement>;
    onPointerLeave: PointerEventHandler<SVGElement>;
    onTouchStart: TouchEventHandler<SVGElement>;
  };
  props: ITooltipProps<D> | null;
}

export { IChartTooltip };
