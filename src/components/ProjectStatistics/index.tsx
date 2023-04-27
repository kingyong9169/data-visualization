import useProjectStatistics from 'src/hooks/api/useProjectStatistics';

import Axis from '../Axis';

import $ from './style.module.scss';
import { useProjectStatisticsChart } from './chart';
const margin = { top: 20, right: 20, bottom: 30, left: 40 };
const styles = {
  width: 300,
  height: 300,
  margin,
};
const viewBox = `0 0 ${styles.width} ${styles.height}`;

export default function ProjectStatistics() {
  const { data: tpsData, isLoading: tpsLoading } = useProjectStatistics(
    'raw',
    'app_counter/tps',
  );
  const { data: respData, isLoading: respLoading } = useProjectStatistics(
    'raw',
    'app_counter/resp_time',
  );
  const { data: cpuData, isLoading: cpuLoading } = useProjectStatistics(
    'raw',
    'app_host_resource/cpu',
  );
  const isAllLoading = tpsLoading || respLoading || cpuLoading;

  const refinedRespData = respData
    ? { ...respData, data: respData.data / 1000 }
    : null;

  const xDatas = [tpsData, refinedRespData, cpuData].map((project) =>
    project ? project : { key: '', name: '', data: 0 },
  );

  const { textRef, rectRef, yScale } = useProjectStatisticsChart(
    xDatas,
    styles,
  );

  return (
    <div className={$['project-chart']}>
      {isAllLoading ? (
        <div>로딩 중..</div>
      ) : (
        <svg viewBox={viewBox}>
          <Axis
            scale={yScale}
            ticks={3}
            tickSize={0}
            direction="Left"
            height={styles.height}
            margin={margin}
          />
          <g ref={rectRef} />
          <g ref={textRef} className={$['text']} />
        </svg>
      )}
    </div>
  );
}
