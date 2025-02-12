import { Box, Flex, Heading } from '@radix-ui/themes';
import { IRawUserRatingHistory, ISeason } from '@tennis-stats/types';
import * as d3 from 'd3';
import { format } from 'date-fns/format';
import { ru } from 'date-fns/locale';
import React, { useRef } from 'react';
import {
  ChartTooltip,
  useDimensions,
  useTooltip,
  TimeXAxis,
  YAxis,
} from '../../../../../../../../shared/components/Chart';
import useAxes from '../../hooks/useAxes';
import useLinePoints from '../../hooks/useLinePoints';
import useSeasonsAreas from '../../hooks/useSeasonsAreas';
import RatingStarSvg from '../../../../../../../../shared/svg-icons/rating-star.svg';

import '../../../../../../../../shared/components/Chart/styles.scss';

interface IProps {
  ratingList: IRawUserRatingHistory[];
  seasonsList: ISeason[];
  selectedYear: string;
}

const PADDINGS = { top: 6, right: 0, left: 42, bottom: 30 };

function RatingChart(props: IProps) {
  const { ratingList, seasonsList, selectedYear } = props;

  const wrapperRef = useRef(null);
  const dimensions = useDimensions(wrapperRef, PADDINGS);

  const axes = useAxes(ratingList, selectedYear, dimensions);
  const tooltip = useTooltip(ratingList, axes, 'date');

  const seasonsAreas = useSeasonsAreas(seasonsList, axes, dimensions);
  const linePoints = useLinePoints(ratingList, axes, tooltip.props?.data);

  const lineBuilder = d3
    .line<IRawUserRatingHistory>()
    .x((d) => axes.xScale(d.date))
    .y((d) => axes.yScale(d.rating))
    .curve(d3.curveCatmullRom);

  const linePath = lineBuilder(ratingList);

  if (!linePath) {
    return null;
  }

  return (
    <div className={'chart-container'} ref={wrapperRef} style={{ height: 250 }}>
      <svg
        width={dimensions.fullWidth}
        height={dimensions.fullHeight}
        viewBox={`0 0 ${dimensions.fullWidth} ${dimensions.fullHeight}`}
        style={{ touchAction: 'pan-y' }}
        {...tooltip.svgEvents}
      >
        <g
          width={dimensions.boundsWidth}
          height={dimensions.boundsHeight}
          transform={`translate(${[PADDINGS.left, PADDINGS.top].join(',')})`}
        >
          {seasonsAreas}
          {linePoints}

          <path d={linePath} stroke="var(--accent-10)" fill="none" strokeWidth={2} />

          {tooltip.props && (
            <g>
              <line
                x1={tooltip.props.x}
                y1={0}
                x2={tooltip.props.x}
                y2={dimensions.boundsHeight}
                stroke="var(--slate-a5)"
              />
            </g>
          )}

          {axes.yScale && <YAxis yScale={axes.yScale} dimensions={dimensions} lines />}
          {axes.xScale && (
            <TimeXAxis xScale={axes.xScale} dimensions={dimensions} nice={{ removeLast: true }} />
          )}
        </g>
      </svg>

      {tooltip.props && (
        <ChartTooltip
          tooltipProps={tooltip.props}
          dimensions={dimensions}
          leftPadding={PADDINGS.left}
        >
          {(data) => (
            <Flex direction={'column'} align={'center'} justify={'center'} gap={'1'}>
              <Heading size={'1'}>{format(data.date, 'dd MMM yyyy', { locale: ru })}</Heading>

              <Flex>
                <Box width={'20px'} height={'20px'} ml={'-1'} mr={'1'}>
                  <RatingStarSvg />
                </Box>
                <span>{data.rating}</span>
              </Flex>
            </Flex>
          )}
        </ChartTooltip>
      )}
    </div>
  );
}

export default RatingChart;
