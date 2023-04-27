import Select from '../Select';
import SubTitle from '../SubTitle';

import $ from './style.module.scss';
import { threadKindDatas, threadTypeDatas } from './constants';
import { useAgentGraphKind, useAgentThread } from './hooks';

const margin = { top: 20, right: 20, bottom: 30, left: 40 };
const styles = {
  width: 300,
  height: 300,
  margin,
};

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
  const useAgentChart = useAgentGraphKind(kind);
  const chartRef = useAgentChart(data, styles);

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
        <div ref={chartRef} className={$['agent-chart']} />
      )}
    </div>
  );
}
