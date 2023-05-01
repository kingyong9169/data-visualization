import { timeFormat } from 'd3';
import { memo } from 'react';
import { styles } from 'src/constants/chartStyles';

import SubTitle from '../shared/SubTitle';
import Select from '../shared/Select';
import LineChart from '../shared/LineChart';
import ErrorFallback from '../shared/ErrorFallback';
import LoadingSpinner from '../shared/LoadingSpinner';

import $ from './style.module.scss';
import { threadKindDatas, threadTypeDatas } from './constants';
import { useAgentThread } from './hooks';
import { refinedData } from './helpers';

function AgentThread() {
  const {
    threadType,
    kind,
    handleThreadKind,
    handleThreadType,
    data,
    isLoading,
    error,
    reset,
    title,
  } = useAgentThread();
  const datas = refinedData(data);

  return (
    <div className={$['container']}>
      <SubTitle text={title} />
      <Select
        datas={threadKindDatas}
        currentValue={kind}
        handleChange={handleThreadKind}
      />
      <Select
        datas={threadTypeDatas}
        currentValue={threadType}
        handleChange={handleThreadType}
      />
      {isLoading && <LoadingSpinner />}
      {error && <ErrorFallback message={error.message} reset={reset} />}
      {!isLoading && !error && (
        <LineChart
          datas={datas}
          styles={styles}
          xFormat={timeFormat('%H:%M')}
        />
      )}
    </div>
  );
}

export default memo(AgentThread);
