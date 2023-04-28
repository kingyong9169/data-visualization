import { timeFormat } from 'd3';

import SubTitle from '../shared/SubTitle';
import Select from '../shared/Select';
import LineChart from '../shared/LineChart';

import $ from './style.module.scss';
import { threadKindDatas, threadTypeDatas } from './constants';
import { useAgentThread } from './hooks';

const margin = { top: 20, right: 20, bottom: 30, left: 40 };
const styles = {
  width: 300,
  height: 300,
  margin,
};

function isAvgThreadData(
  data: res.Success<res.AverageAgent> | res.Success<res.IndividualAgent>,
): data is res.Success<res.AverageAgent> {
  return !!(data.data as res.AverageAgent).series;
}

function refinedData(
  data: res.Success<res.AverageAgent> | res.Success<res.IndividualAgent> | null,
): res.AgentData[][] {
  if (!data) return [[[0, 0]]];
  return isAvgThreadData(data)
    ? [data.data.series]
    : data.data.objects.map(({ series }) => series);
}

export default function AgentThread() {
  const {
    threadType,
    kind,
    handleThreadKind,
    handleThreadType,
    data,
    isLoading,
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
      {isLoading ? (
        <div>로딩중...</div>
      ) : (
        <LineChart
          datas={datas}
          styles={styles}
          xFormat={timeFormat('%H:%M')}
        />
      )}
    </div>
  );
}
