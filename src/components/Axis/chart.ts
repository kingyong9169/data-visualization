import {
  AxisDomain,
  axisBottom,
  axisLeft,
  axisRight,
  axisTop,
  select,
} from 'd3';
import { useEffect, useRef } from 'react';

import { AxisDirection, AxisHookProps } from '.';

function axisDirection(direction: AxisDirection) {
  switch (direction) {
    case 'Left':
      return axisLeft;
    case 'Bottom':
      return axisBottom;
    case 'Right':
      return axisRight;
    case 'Top':
      return axisTop;
    default:
      throw Error('direction is not valid');
  }
}

export function useChartAxis<Domain extends AxisDomain>({
  scale,
  direction,
  ticks,
  tickSize,
  format,
}: AxisHookProps<Domain>) {
  const axisRef = useRef<SVGGElement | null>(null);

  useEffect(() => {
    if (!axisRef.current) return;
    const g = select(axisRef.current);
    const axis = axisDirection(direction)(scale).ticks(ticks);
    if (format) axis.tickFormat(format).tickSizeOuter(0);
    if (tickSize !== undefined) axis.tickSize(tickSize);
    g.call(axis);
  }, [direction, scale, ticks, format, tickSize]);
  return axisRef;
}
