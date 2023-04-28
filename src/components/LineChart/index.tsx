import { ChartStyleParams } from 'src/types/chart';

import { useLineChart } from '../LineChart/chart';
import Axis from '../Axis';

import $ from './style.module.scss';

type Props = {
  datas: res.AgentData[][];
  styles: ChartStyleParams;
  xFormat?: null;
};

export default function LineChart({ datas, styles, xFormat }: Props) {
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
