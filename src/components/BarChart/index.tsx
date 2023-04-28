import { ChartStyleParams } from 'src/types/chart';

import Axis from '../Axis';

import $ from './style.module.scss';
import { useBarChart } from './chart';

type Props = {
  datas: res.Success<number>[];
  styles: ChartStyleParams;
};

export default function BarChart({ datas, styles }: Props) {
  const { textRef, rectRef, yScale } = useBarChart(datas, styles);
  const viewBox = `0 0 ${styles.width} ${styles.height}`;

  return (
    <svg viewBox={viewBox} className={$['bar-chart']}>
      <Axis
        scale={yScale}
        ticks={3}
        tickSize={0}
        direction="Left"
        height={styles.height}
        margin={styles.margin}
      />
      <g ref={rectRef} />
      <g ref={textRef} className={$['text']} />
    </svg>
  );
}
