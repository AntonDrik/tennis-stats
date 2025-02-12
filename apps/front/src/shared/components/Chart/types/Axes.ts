import * as d3 from 'd3';

type TAxesTypes = 'timebased' | 'bandbased';

type TXAxis<TYPE extends TAxesTypes> = TYPE extends 'timebased'
  ? d3.ScaleTime<number, number>
  : TYPE extends 'bandbased'
  ? d3.ScaleBand<string>
  : never;

type TAxes<TYPE extends TAxesTypes> = {
  xScale: TXAxis<TYPE>;
  yScale: d3.ScaleLinear<number, number>;
};

export { TAxes };
