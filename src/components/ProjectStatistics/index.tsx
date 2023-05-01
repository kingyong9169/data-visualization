import useProjectStatistics from 'src/hooks/api/useProjectStatistics';
import { memo } from 'react';

import BarChart from '../shared/BarChart';
import ErrorFallback from '../shared/ErrorFallback';
import LoadingSpinner from '../shared/LoadingSpinner';

import $ from './style.module.scss';
const margin = { top: 20, right: 20, bottom: 30, left: 40 };
const styles = {
  width: 300,
  height: 300,
  margin,
};

function ProjectStatistics() {
  const {
    data: tpsData,
    isLoading: tpsLoading,
    error: tpsError,
    reset: tpsReset,
  } = useProjectStatistics('raw', 'app_counter/tps');
  const {
    data: respData,
    isLoading: respLoading,
    error: respError,
    reset: respReset,
  } = useProjectStatistics('raw', 'app_counter/resp_time');
  const {
    data: cpuData,
    isLoading: cpuLoading,
    error: cpuError,
    reset: cpuReset,
  } = useProjectStatistics('raw', 'app_host_resource/cpu');
  const isAllLoading = tpsLoading || respLoading || cpuLoading;
  const errorExist = tpsError || respError || cpuError;
  const reset = () => {
    tpsReset();
    respReset();
    cpuReset();
  };

  const refinedRespData = respData
    ? { ...respData, data: respData.data / 1000 }
    : null;

  const xDatas = [tpsData, refinedRespData, cpuData].map((project) =>
    project ? project : { key: '', name: '', data: 0 },
  );

  return (
    <div className={$['container']}>
      {isAllLoading && <LoadingSpinner />}
      {errorExist && (
        <ErrorFallback message={errorExist.message} reset={reset} />
      )}
      {!isAllLoading && !errorExist && (
        <BarChart datas={xDatas} styles={styles} ticks={3} />
      )}
    </div>
  );
}

export default memo(ProjectStatistics);
