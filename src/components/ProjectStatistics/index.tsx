import useProjectStatistics from 'src/hooks/api/useProjectStatistics';
import { memo } from 'react';

import BarChart from '../shared/BarChart';

import $ from './style.module.scss';
const margin = { top: 20, right: 20, bottom: 30, left: 40 };
const styles = {
  width: 300,
  height: 300,
  margin,
};

function ProjectStatistics() {
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

  return (
    <div className={$['container']}>
      {isAllLoading ? (
        <div>로딩 중..</div>
      ) : (
        <BarChart datas={xDatas} styles={styles} ticks={3} />
      )}
    </div>
  );
}

export default memo(ProjectStatistics);
