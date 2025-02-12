import { Flex } from '@radix-ui/themes';
import React, { ReactElement } from 'react';

import './styles.scss';
import { IExtendedDimensions } from '../../types/Dimensions';
import { IChartTooltip } from '../../types/Tooltip';

interface IProps<D> {
  dimensions: IExtendedDimensions;
  tooltipProps: IChartTooltip<D>['props'];
  leftPadding: number;
  children: (data: D) => ReactElement;
}

const TOOLTIP_WIDTH = 100;
const TOOLTIP_HEIGHT = 45;

function ChartTooltip<D>(props: IProps<D>) {
  const { tooltipProps } = props;

  const inBoundsX = (x: number) => {
    const boundsWidth = props.dimensions.boundsWidth;

    const halfTooltipWidth = TOOLTIP_WIDTH / 2;

    const xRightBound = x + halfTooltipWidth;
    const xLeftBound = x - halfTooltipWidth;

    if (xRightBound > boundsWidth) {
      return boundsWidth - halfTooltipWidth;
    }

    if (xLeftBound < 0) {
      return TOOLTIP_WIDTH / 2;
    }

    return x;
  };

  const inBoundsY = (y: number) => {
    const boundsHeight = props.dimensions.boundsHeight;
    const halfTooltipHeight = TOOLTIP_HEIGHT / 2;

    const yBottomBound = y + halfTooltipHeight;
    const yTopBound = y - halfTooltipHeight;

    if (yBottomBound > boundsHeight) {
      return boundsHeight - halfTooltipHeight;
    }

    if (yTopBound < 0) {
      return TOOLTIP_HEIGHT / 2;
    }

    return y;
  };

  if (!tooltipProps) {
    return null;
  }

  return (
    <Flex
      className={'tooltip'}
      style={{
        width: TOOLTIP_WIDTH,
        height: TOOLTIP_HEIGHT,
        top: inBoundsY(tooltipProps.y - 100),
        left: inBoundsX(tooltipProps.x - 70) + props.leftPadding - TOOLTIP_WIDTH / 2,
      }}
    >
      {props.children(tooltipProps.data)}
    </Flex>
  );
}

export default ChartTooltip;
