import { ChartStyleParams } from 'src/types/chart';
import { AxisDomain } from 'd3';

import { useLineChart } from '../LineChart/chart';
import Axis, { AxisHookProps } from '../Axis';

import $ from './style.module.scss';

type Props<Domain extends AxisDomain> = {
  datas: res.AgentData[][];
  styles: ChartStyleParams;
  xFormat?: AxisHookProps<Domain>['format'];
};

export default function LineChart<Domain extends AxisDomain>({
  datas,
  styles,
  xFormat,
}: Props<Domain>) {
  const { lineRef, xScale, yScale } = useLineChart(datas, styles);
  const viewBox = `0 0 ${styles.width} ${styles.height}`;
  return (
    <svg viewBox={viewBox}>
      <Axis
        scale={yScale}
        ticks={5}
        tickSize={0}
        direction="Left"
        height={styles.height}
        margin={styles.margin}
      />
      <Axis
        scale={xScale}
        ticks={5}
        direction="Bottom"
        format={xFormat}
        height={styles.height}
        margin={styles.margin}
      />
      <g ref={lineRef} className={$['line-chart']} />
    </svg>
  );
}
