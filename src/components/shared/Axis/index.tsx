import { AxisDomain, AxisScale } from 'd3';

import { useChartAxis } from './chart';

export type AxisDirection = 'Left' | 'Bottom' | 'Right' | 'Top';

export type AxisHookProps<Domain> = {
  scale: AxisScale<Domain>;
  format?: (domainValue: Domain, index: number) => string;
  ticks: number;
  tickSize?: number;
  direction: AxisDirection;
};

export type AxisProps<Domain> = AxisHookProps<Domain> & {
  height: number;
  margin: {
    bottom: number;
    left: number;
  };
};

export default function Axis<Domain extends AxisDomain>({
  scale,
  format,
  ticks,
  tickSize,
  height,
  margin,
  direction,
}: AxisProps<Domain>) {
  const { bottom, left } = margin;
  function axisPosition(direction: AxisDirection) {
    switch (direction) {
      case 'Left':
      case 'Right':
        return `${left}, 0`;
      case 'Top':
      case 'Bottom':
        return `0, ${height - bottom}`;
      default:
        throw Error('direction is not valid');
    }
  }

  const axisRef = useChartAxis({ scale, format, ticks, tickSize, direction });
  return (
    <g ref={axisRef} transform={`translate(${axisPosition(direction)})`} />
  );
}
